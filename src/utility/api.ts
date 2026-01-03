import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store-api.softclub.tj/",
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Color", "Brand", "Category"],
  endpoints: () => ({}),
});
