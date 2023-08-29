import React, { useEffect } from 'react'
import Header from '../../Layout/Header/Header'
import Footer from '../../Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetProductsQuery } from '../../Service/product'
import { addProduct } from '../../Redux/Slice/product'
import { useGetUserByIdQuery } from '../../Service/getUsers'
import { storeUser } from '../../Redux/Slice/user'
import ErrorBoundary from '../../Component/ErrorBoundry/ErrorBoundy'

const Desktop = () => {
    const { data } = useGetProductsQuery()
    const { data: user } = useGetUserByIdQuery()
    const dispatch = useDispatch()
    useEffect(() => {
        if (data) {
            dispatch(addProduct(data))
        }
    }, [data])

    useEffect(() => {
        if (user) {
            dispatch(storeUser(user))
        }
    }, [user])

    return (
        <>
            <ErrorBoundary>
                <Header />
                <Outlet />
                <Footer />
            </ErrorBoundary>
        </>
    )
}

export default Desktop