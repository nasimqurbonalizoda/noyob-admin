import { baseApi } from '../../utility/api';

interface LoginResponse {
  data: string; 
  errors: any[];
  statusCode: number;
}

interface LoginRequest {
  userName: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (elem) => ({
        url: '/Account/login',
        method: 'POST',
        body: elem,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;