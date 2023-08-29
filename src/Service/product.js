import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.REACT_APP_API_URL;

export const product = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
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
                body: data,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // }
            }),
            invalidatesTags: ['Product'],
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
            query: (data) => ({
                url: `productid`,
                method: 'POST',
                body: data
            }),
        }),
        findSingleProduct: builder.mutation({
            query: ({ id }) => ({
                url: `productById/${id}`,
                method: 'POST',
            }),
        })
    })
})


export const { useGetProductsQuery, useCreateProductsMutation, useUpdateProductsMutation, useDeleteProductsMutation, useFindProductMutation, useFindSingleProductMutation } = product