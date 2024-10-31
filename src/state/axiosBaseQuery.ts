import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";
import axiosInstance from "../utils/axios";
import { setError } from "./slices/error.slice";
import { AppDispatch } from "./store";

interface AxiosBaseQueryArgs extends AxiosRequestConfig {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: unknown;
  params?: unknown;
}

type DispatchType = {
  dispatch: AppDispatch;
};
const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }): BaseQueryFn<AxiosBaseQueryArgs> =>
  async ({ url, method, data, params }, { dispatch }: DispatchType) => {
    try {
      const result = await axiosInstance({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message || "Ooops, an error occurred. Please try again.";

      dispatch(setError(errorMessage));

      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
