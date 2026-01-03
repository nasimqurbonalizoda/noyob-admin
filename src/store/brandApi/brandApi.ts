import { baseApi } from "../../utility/api";

type Brand = {
  id: number;
  brandName: string;
};

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getBrands: builder.query<{ data: { brand: Brand[] } }, void>({
      query: () => "/Brand/get-brands",
      providesTags: ["Brand"],
    }),

    addBrand: builder.mutation<void, string>({
      query: (brandName) => ({
        url: `/Brand/add-brand?BrandName=${encodeURIComponent(brandName)}`,
        method: "POST",
      }),
      invalidatesTags: ["Brand"],
    }),

    updateBrand: builder.mutation<void, { id: number; brandName: string }>({
      query: ({ id, brandName }) => ({
        url: `/Brand/update-brand?Id=${id}&BrandName=${encodeURIComponent(
          brandName
        )}`,
        method: "PUT",
      }),
      invalidatesTags: ["Brand"],
    }),

    deleteBrand: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Brand/delete-brand?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
