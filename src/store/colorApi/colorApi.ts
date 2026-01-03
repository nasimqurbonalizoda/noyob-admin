import { baseApi } from '../../utility/api';

const colorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query({
      query: ({ pageNumber = 1, pageSize = 10, colorName = '' } = {}) => ({
        url: 'Color/get-colors',
        method: 'GET',
        params: {
          PageNumber: pageNumber,
          PageSize: pageSize,
          ColorName: colorName,
        },
      }),
      providesTags: ['Color'],
    }),
    addColor: builder.mutation({
      query: (colorName) => ({
        url: 'Color/add-color',
        method: 'POST',
        params: {
          ColorName: colorName,
        },
      }),
      invalidatesTags: ['Color'],
    }),
    updateColor: builder.mutation({
      query: ({ id, colorName }) => ({
        url: 'Color/update-color',
        method: 'PUT',
        params: {
          Id: id,
          ColorName: colorName,
        },
      }),
      invalidatesTags: ['Color'],
    }),

    deleteColor: builder.mutation({
      query: (id) => ({
        url: 'Color/delete-color',
        method: 'DELETE',
        params: {
          id: id,
        },
      }),
      invalidatesTags: ['Color'],
    }),
  }),
});

export const {
  useGetColorsQuery,
  useAddColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;