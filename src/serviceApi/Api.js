import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
     prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Contacts'],
  endpoints: build => ({
    getContacts: build.query({
      query: () => `contacts`,
      providesTags: result =>
        result
          ? 
            [
              ...result.map(({ id }) => ({ type: 'Contacts', id })),
              { type: 'Contacts', id: 'LIST' },
            ]
          : 
            [{ type: 'Contacts', id: 'LIST' }],
    }),
    deleteContact: build.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Contacts', id }],
    }),
    addContact: build.mutation({
      query: newContact => ({
        url: 'contacts',
        method: 'POST',
        body: newContact,
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    signup: build.mutation({
      query: userData => ({
        url: '/users/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    login: build.mutation({
      query: userData => ({
        url: '/users/login',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    getUser: build.query({
      query: () => '/users/current',
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  useSignupMutation,
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation
} = Api;

console.log(Api)