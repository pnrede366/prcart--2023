import React from 'react'
import './admin.scss'
import Sales from './Chunks/Sales'
import Totals from './Chunks/Totals'
import { useGetAllUserQuery } from '../../Service/getUsers'
import { useGetProductsQuery } from '../../Service/product'
import { useGetordersQuery } from '../../Service/orders'

const Admin = () => {
    const { data  } = useGetAllUserQuery()
    const { data:products  } = useGetProductsQuery()
    const { data: orders } = useGetordersQuery()

    return (
        <div className='admin'>
            <h1>Admin Panel</h1>
            <Totals data={data} products={products} orders={orders}/>
            <Sales users={data} products={products} orders={orders}/>
        </div>
    )
}

export default Admin