import { configureStore } from "@reduxjs/toolkit";
import { productEditReducer, productsApi } from "./slices/products.slice";
import { permissionsSlice } from "./slices/permissions.slice";
import errorReducer from "./slices/error.slice";

export const store = configureStore({
  reducer: {
    productEdit: productEditReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [permissionsSlice.reducerPath]: permissionsSlice.reducer,
    error: errorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware, permissionsSlice.middleware),
});

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
