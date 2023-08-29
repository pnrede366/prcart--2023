import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.REACT_APP_API_URL;

export const category = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: 'category',
                method: 'GET'
            })
        }),
        getSearch: builder.mutation({
            query: (text) => ({
                url: `search?text=${text}`,
                method: 'POST'
            })
        }),
        getCategorySearch: builder.mutation({
            query: (text) => ({
                url: `searchCategory?text=${text}`,
                method: 'POST'
            })
        })
    })
})

export const { useGetCategoryQuery,useGetSearchMutation, useGetCategorySearchMutation } = category