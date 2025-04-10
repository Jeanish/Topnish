import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch a single product

export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id) => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${id}`
      );
      console.log(response);
      return response.data; // ← is this the actual product object?
    }
  );
  

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async({ id, productData }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/${id}`,
            productData,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    }
);

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/products?${queryString}`
      );
      return response.data;
    }
  );
  

export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async({id}) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/similar/${id}`
        );

        console.log("Fetched Similar Products:", response.data); // 👈 Add this

    return response.data;
    }
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct:null,
        similarProducts: [],
        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProductDetails.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        
        // Handle updating product
        .addCase(updateProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const updatedProduct = action.payload;
            const index = state.products.findIndex((product) => product._id === updatedProduct._id);

            if(index !== -1){
                state.products[index] = updatedProduct;
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchSimilarProducts.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchSimilarProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.similarProducts = action.payload;
        })
        .addCase(fetchSimilarProducts.rejected, (state, action) => {
            state.loading = false;
            state.similarProducts = []; // ✅ add this line
    state.error = action.error.message;
        })

    }
})


export default productSlice.reducer;