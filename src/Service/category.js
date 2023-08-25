import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const category = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090/'
    }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: 'category',
                method: 'GET'
            })
        })
    })
})

export const {useGetCategoryQuery} = category