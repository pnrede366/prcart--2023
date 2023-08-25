import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const getUsers = createApi({
    reducerPath: 'getUserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090/'
    }),
    tagTypes:['User'],
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
            invalidatesTags:['User'],
        }),
        createUser: builder.mutation({
            query:(data)=>{
                return({
                    url:'users',
                    method:'POST',
                    body:data
                })
            }
        }),
        loginUser: builder.mutation({
            query:(data)=>{
                return{
                    url:'login',
                    method:'POST',
                    body:data
                }
            }
        })
    })
})

export const { useGetAllUserQuery, useDeleteUserMutation, useCreateUserMutation, useLoginUserMutation } = getUsers