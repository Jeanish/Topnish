import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {products: []};
};

const SaveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const fectCart = createAsyncThunk("cart/fetchCart", async({userId, guestId},
    {rejectWithValue}) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/carts`,
            {
                params: {userId, guestId},
            }
          );
            
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const addToCart = createAsyncThunk("cart/addToCart", async ({productId, quantity, size, color,
    guestId, userId}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/carts`,{
                productId,
                quantity,
                size,
                color,
                guestId,
                userId,
            });
            return response.data;
        }catch (error) {
            return rejectWithValue(error.response.data)
    }
})

export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity", async ({productId, quantity, guestId, userId, size, color},
    {rejectWithValue}) => {
      try {
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/carts`,{
            productId,
            quantity,
            guestId,
            userId,
            size,
            color,
          })
            return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    });

    export const removeFromCart = createAsyncThunk(
        "cart/removeFromCart",
        async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
          try {
            const response = await axios.delete(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/carts`,
              {
                params: { productId, guestId, userId, size, color },
              }
            );
            return response.data;
          } catch (error) {
            return rejectWithValue(error.response?.data);
          }
        }
      );
      

export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({guestId, user }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/carts/merge`,
          { guestId, user },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        return response.data;
    }catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
  );

  const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cart: loadCartFromStorage(),
      loading: false,
      error: null,
    },
    reducers: {
      clearCart: (state) => {
        state.cart = { products: [] };
        localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fectCart.pending,(state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fectCart.fulfilled,(state, action) => {
            state.loading = false;
            state.cart = action.payload;
            SaveCartToStorage(action.payload);

        }).addCase(fectCart.rejected,(state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        })
        .addCase(addToCart.pending,(state) => {
            state.loading = true;
            state.error = null;

        }).addCase(addToCart.fulfilled,(state, action) => {
            state.loading = false;
            state.cart = action.payload;
            SaveCartToStorage(action.payload);

        }).addCase(addToCart.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart";
        })
        .addCase(updateCartItemQuantity.pending,(state) => {
            state.loading = true;
            state.error = null;
        }).addCase(updateCartItemQuantity.fulfilled,(state, action) => {
            state.loading = false;
            state.cart = action.payload;
            SaveCartToStorage(action.payload);

        }).addCase(updateCartItemQuantity.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update item quantity";
        }).addCase(removeFromCart.pending,(state) => {
            state.loading = true;
            state.error = null;
        }).addCase(removeFromCart.fulfilled,(state, action) => {
            state.loading = false;
            state.cart = action.payload;
            SaveCartToStorage(action.payload);

        }).addCase(removeFromCart.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove item";
        }).addCase(mergeCart.pending,(state) => {
            state.loading = true;
            state.error = null;
        }).addCase(mergeCart.fulfilled,(state, action) => {
            state.loading = false;
            state.cart = action.payload;
            SaveCartToStorage(action.payload);

        }).addCase(mergeCart.rejected,(state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart";
        })
    }
});

export const {clearCart} = cartSlice.actions;

export default cartSlice.reducer;