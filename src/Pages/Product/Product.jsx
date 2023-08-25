import React from 'react'
import { Outlet } from 'react-router'

const Product = () => {
  return (
    <div>Product
      <Outlet/>
    </div>
  )
}

export default Product