// src/store/categoryApi/categoryApi.ts
import { baseApi } from '../../utility/api';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => '/Category/get-categories',
      providesTags: ['Category'],
    }),
    addCategory: build.mutation({
      query: (formData: FormData) => ({
        url: '/Category/add-category',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: build.mutation({
      query: ({ id, formData }: { id: number; formData: FormData }) => ({
        url: '/Category/update-category',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: build.mutation({
      query: (id: number) => ({
        url: '/Category/delete-category',
        method: 'DELETE',
        params: { id },
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;