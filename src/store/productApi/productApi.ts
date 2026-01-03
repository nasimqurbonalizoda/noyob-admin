import { baseApi } from "../../utility/api";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => "Product/get-products",
      providesTags: ["Product"],
    }),

    getColors: builder.query<any, void>({
      query: () => "Color/get-colors",
      providesTags: ["Color"],
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `Product/delete-product?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    addProduct: builder.mutation<any, FormData>({
      query: (body) => ({
        url: "Product/add-product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    editProduct: builder.mutation<any, { id: number; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `Product/update-product?id=${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetColorsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useEditProductMutation, 
} = productApi;
