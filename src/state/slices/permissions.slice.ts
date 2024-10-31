import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";
import { Permissions } from "../../types/Permissions.type";
import axios from "../../utils/axios";

export const permissionsSlice = createApi({
  reducerPath: "permissions",
  baseQuery: axiosBaseQuery({ baseUrl: axios.defaults.baseURL as string }),
  tagTypes: ["Permissions"],
  endpoints: (builder) => ({
    getPermissions: builder.query<Permissions, void>({
      query: () => ({ url: "/permissions", method: "GET" }),
      providesTags: ["Permissions"],
    }),
  }),
});

export const selectPermissionsData = permissionsSlice.endpoints.getPermissions.select();
export const { useGetPermissionsQuery } = permissionsSlice;
