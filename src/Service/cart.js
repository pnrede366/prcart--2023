import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.REACT_APP_API_URL;

export const cart = createApi({
    reducerPath: 'cart',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', token)
            }
            return headers
        },
    }),
    tagTypes: ['cart'],
    endpoints: (builder) => ({
        getcarts: builder.query({
            query: () => ({
                url: 'cart',
                method: 'GET'
            }),
            providesTags: ['cart']
        }),
        createcarts: builder.mutation({
            query: (data) => ({
                url: 'cart',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['cart'],
        }),

        deletecarts: builder.mutation({
            query: ({ id }) => ({
                url: `cart/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['cart']
        }),
        updatecarts: builder.mutation({
            query: ({ id, data }) => ({
                url: `cart/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['cart']
        }),
        findcart: builder.mutation({
            query: ({ id, data }) => ({
                url: `cart/${id}`,
                method: 'PUT',
                body: data
            }),
        })
    })
})


export const { useGetcartsQuery, useCreatecartsMutation, useUpdatecartsMutation, useDeletecartsMutation, useFindcartMutation } = cart