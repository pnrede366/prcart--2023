import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.REACT_APP_API_URL;

export const order = createApi({
    reducerPath: 'order',
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
    tagTypes: ['order'],
    endpoints: (builder) => ({
        getorders: builder.query({
            query: () => ({
                url: 'orders',
                method: 'GET'
            }),
            providesTags: ['order']
        }),
        createorders: builder.mutation({
            query: (data) => ({
                url: 'orders',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['order'],
        }),

        deleteorders: builder.mutation({
            query: (id) => ({
                url: `orders/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['order']

        }),
        updateorders: builder.mutation({
            query: ({ id, data }) => ({
                url: `orders/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['order']
        }),
        findorder: builder.mutation({
            query: ({ id, data }) => ({
                url: `orders/${id}`,
                method: 'PUT',
                body: data
            }),
        }),
        getOrderByUser: builder.query({
            query: () => ({
                url: `/ordersById`,
                method: 'GET',
            }),
        })
    })
})


export const { useGetordersQuery, useCreateordersMutation, useUpdateordersMutation, useDeleteordersMutation, useFindorderMutation, useGetOrderByUserQuery } = order