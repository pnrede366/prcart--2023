import React from 'react'
import './admin.scss'
import Sales from './Chunks/Sales'
import Totals from './Chunks/Totals'
import { useGetAllUserQuery } from '../../Service/getUsers'
import { useGetProductsQuery } from '../../Service/product'

const Admin = () => {
    const { data  } = useGetAllUserQuery()
    const { data:products  } = useGetProductsQuery()
    return (
        <div className='admin'>
            <h1>Admin Panel</h1>
            <Totals data={data} products={products}/>
            <Sales users={data} products={products}/>
        </div>
    )
}

export default Admin