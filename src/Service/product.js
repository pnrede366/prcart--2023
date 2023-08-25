import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const product = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8090/' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: 'product',
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        createProducts: builder.mutation({
            query: (data) => ({
                url: 'product',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `product/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']

        }),
        updateProducts: builder.mutation({
            query: ({ id, data }) => ({
                url: `product/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        findProduct: builder.mutation({
            query: (id) => ({
                url: `product/${id}`,
                method: 'POST',
            }),
        })
    })
})


export const { useGetProductsQuery, useCreateProductsMutation, useUpdateProductsMutation, useDeleteProductsMutation, useFindProductMutation } = product