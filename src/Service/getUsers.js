import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = createApi({
    reducerPath: 'getUserApi',
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
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => ({
                url: 'users',
                method: "GET",
            }),
            providesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return ({
                    url: `users/${id}`,
                    method: 'DELETE'
                })
            },
            invalidatesTags: ['User'],
        }),
        createUser: builder.mutation({
            query: (data) => {
                return ({
                    url: 'users',
                    method: 'POST',
                    body: data
                })
            }
        }),
        loginUser: builder.mutation({
            query: (data) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['User'],
        }),
        getUserById: builder.query({
            query: () => {
                return {
                    url: 'user',
                    method: 'GET',
                }
            }
        }),
        updateUser: builder.mutation({
            query: (data) => {
                return ({
                    url: 'users',
                    method: 'PUT',
                    body:data
                })
            },
            invalidatesTags: ['User'],
        })
    })
})

export const { useGetAllUserQuery, useDeleteUserMutation, useCreateUserMutation, useLoginUserMutation, useGetUserByIdQuery,useUpdateUserMutation } = getUsers