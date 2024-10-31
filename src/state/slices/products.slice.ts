import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "../axiosBaseQuery";
import { Product } from "../../types/Product.type";
import axios from "../../utils/axios";

// slice
type ProductEditInitialState = {
  productEdit: {
    product: Product | null;
  };
};

const productEditSlice = createSlice({
  name: "productEdit",
  initialState: { product: null },
  reducers: {
    setProductEdit: (state, action) => {
      state.product = action.payload.product;
    },
    clearProductEdit: (state) => {
      state.product = null;
    },
  },
});

export const { setProductEdit, clearProductEdit } = productEditSlice.actions;
export const selectProductEdit = (state: ProductEditInitialState) =>
  state.productEdit.product;
export const productEditReducer = productEditSlice.reducer;

// api
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery({ baseUrl: axios.defaults.baseURL as string }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({ url: "/products", method: "GET" }),
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query<Product, number>({
      query: (productId) => ({ url: `/products/${productId}`, method: "GET" }),
      providesTags: (_result, _error, productId) => [{ type: "Products", id: productId }],
    }),
    addProduct: builder.mutation<Product, Omit<Product, "id">>({
      query: (newProduct) => ({ url: "/products", method: "POST", data: newProduct }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<Product, { id: number; product: Product }>({
      query: ({ id, product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        data: product,
      }),
      invalidatesTags: ["Products"],
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(clearProductEdit());
      },
    }),
    deleteProduct: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
