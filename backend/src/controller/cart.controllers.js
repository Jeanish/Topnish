import express from "express"
import { Cart } from "../models/cart.model.js"
import{ Product} from "../models/product.model.js"
import { verifyJWT,admin } from '../middleware/auth.middleware.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.utils.js";

const getCart = async (userId, guestId) => {
    console.log(`🔍 Searching cart for: userId=${userId}, guestId=${guestId}`);

    let cart = null;

    if (userId) {
        cart = await Cart.findOne({ user: userId });
    } else if (guestId) {
        cart = await Cart.findOne({ guestId: guestId });
    }

    return cart; // If no cart found, it will return null
};

const addItemInCart = asyncHandler(async(req,res )=>{
    const {productId ,quantity ,size,color, guestId, userId} = req.body;
    try {
        const product = await Product.findById(productId);

        if(!product) {
            throw new ApiError(404, "Product not found");
        }

        let cart = await getCart(userId ,guestId);
        // console.log(cart);
        
        // if cart exists then update,
        if(cart){
            const productIndex = cart.products.findIndex((p) => 
            p.productId.toString() === productId && p.size === size && p.color === color);

            if(productIndex > -1){
                cart.products[productIndex].quantity += quantity;
            }else{
                // add new product
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size,
                    color,
                    quantity,
                });
            }

            // Recalculate the total price
            cart.totalPrice = cart.products.reduce((acc,item)=> acc+item.price*item.quantity,0);
        await cart.save();
        return res.status(200).json(cart);
        }else{
            
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),                
                products:[
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price*quantity,
            });
            
            return res.status(201).json(newCart);
        }


    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Server error");
    }
});

const updateCart = asyncHandler(async(req,res)=>{

    const {productId, quantity, size, color, guestId, userId } =req.body;

    try {
        let cart = await getCart(userId,guestId);
        if(!cart)  throw new ApiError(404, "Cart not found");

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size === size && p.color === color);

        if(productIndex > -1){
            if(quantity > 0){
                cart.products[productIndex].quantity = quantity;
            }else{
                cart.products.splice(productIndex, 1);
            }

            cart.totalPrice = cart.products.reduce((acc,item) => acc+item.price * item.quantity,0);

            await cart.save();
            return res.status(200).json(cart);

        }else{
            throw new ApiError(404, "Product not found in cart");
        }

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Server error");

    }
})

const deleteCart = asyncHandler(async (req, res) => {
    const { productId, size, color, guestId, userId } = req.query;
  
    try {
      let cart = await getCart(userId, guestId);
  
      if (!cart) {
        throw new ApiError(404, "Cart not found");
      }
  
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
  
      if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
  
        cart.totalPrice = cart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await cart.save();
        return res.status(200).json(cart);
      } else {
        throw new ApiError(404, "Product not found in cart");
      }
    } catch (error) {
      console.error(error);
      throw new ApiError(500, "Server error");
    }
  });
  

  const getCartOfLoggedInUser = asyncHandler(async (req, res) => {
    const { userId, guestId } = req.query;
  
    try {
      const cart = await getCart(userId, guestId);
  
      if (cart) {
        res.json(cart);
      } else {
        throw new ApiError(404, "Cart not found");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError(500, "Server error");
      }
    }
  });
  

const mergeCart = asyncHandler(async(req,res)=>{

    const {guestId} = req.body;

    try {
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user:req.user._id});

        if(guestCart){
            if(guestCart.products.length === 0){
                throw new ApiError(400, "Guest Cart is empty");
            }

            if(userCart){
                guestCart.products.forEach((guestItem)=>{
                    const productIndex = userCart.products.findIndex((item)=>
                    item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color);

                    if(productIndex > -1){
                        // If the items exist in the user cart , update the quantity,

                        userCart.products[productIndex].quantity += guestItem.quantity; 
                    }else{
                        userCart.products.push(guestItem)
                    }
                });
                userCart.totalPrice = userCart.products.reduce((acc,item)=>acc + item.price * item.quantity,0);
                await userCart.save();

                // Remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete({guestId});
                } catch (error) {
                    console.error("Error deleting guest cart:",error);
                    
                }

                res.status(200).json(userCart);
            }else{
                // If the user has no existing cart, assign the guest cart to the user
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                res.status(200).json(guestCart)
            }
        }else{
            if(userCart){
                // Guest cart has already been merged
                return res.status(200).json(userCart);
            }
            throw new ApiError(404, "Guest cart not found");
        }

    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Server error");
        
    }

})

export { addItemInCart,updateCart,deleteCart,getCartOfLoggedInUser,mergeCart }