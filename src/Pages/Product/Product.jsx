import React, { useEffect } from 'react'
import "./product.scss"
import ProductInfo from './Chunks/ProductInfo'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, removeProduct } from '../../Redux/Slice/Cart'
import { useCreatecartsMutation, useDeletecartsMutation, useGetcartsQuery } from '../../Service/cart'
import { notification } from 'antd'
import AuthProduct from './Chunks/AuthProduct'
import { useNavigate } from 'react-router'
import { useGetUserByIdQuery } from '../../Service/getUsers'
import NoDataFound from '../../Component/NoDataFound/NoDataFound'

const Product = () => {
  const [addCart] = useCreatecartsMutation()
  const [removeCart] = useDeletecartsMutation()
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.auth.token)
  const navigate = useNavigate()
  const products = useSelector((state) => state.productSlice)
  const { data: currentUser } = useGetUserByIdQuery();


  const handleCart = async (data, action) => {
    if (!currentUser) {
      navigate('/login')
    }
    else {
      if (action === "add") {
        let res = await addCart({ productId: data._id, quantity: data.quantity, price: data.price })
        dispatch(addProduct({ productId: data._id, quantity: data.quantity, price: data.price }))
        if (res?.data?.success) {
          notification.info({ message: `${data.title} added to cart` })
        }
      }
      else {
        let res = await removeCart({ id: data._id })
        dispatch(removeProduct({ productId: data._id, quantity: '', price: data.price }))
        if (res?.data?.success) {
          notification.error({ message: `${data.title} removed from cart` })
        }
      }
    }
  }

  if (!products.length) {
    return <NoDataFound />
  }
  return (
    <>
      <div className='product__wrapper'>
        {
          products.map((item) => {
            return (
              currentUser ?
                <AuthProduct item={item} handleCart={handleCart} showBtn={true} />
                :
                <ProductInfo data={item} handleCart={handleCart} showBtn={true} />

            )
          })
        }
      </div>
    </>
  )
}

export default Product;