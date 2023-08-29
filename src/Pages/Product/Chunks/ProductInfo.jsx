import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { updateProductQuantity } from '../../../Redux/Slice/Cart';
import { useGetcartsQuery } from '../../../Service/cart';

const ProductInfo = ({ data, handleCart, cart, showBtn, cartBtn, quantity, total, settotal }) => {
    const isAdded = cart?.some((item) => item.productId === data._id);
    const dispatch = useDispatch()
    const { data: cartInfo } = useGetcartsQuery()
    const product = cartInfo?.find((item) => item.productId === data._id)
    const [count, setcount] = useState(product?.quantity ?? 1)

    useEffect(() => {
        dispatch(updateProductQuantity({ productId: data?._id, price: data?.price, quantity: count }));

    }, [count, data, dispatch]);


    const onCount = (action) => {
        if (action === "inc") {
            setcount(count + 1);
        } else {
            setcount(count > 1 ? count - 1 : count);
        }
    };

    const getBtn = () => {
        const btn = [
            { onClick: () => handleCart(data), text: 'Remove From Cart', icon: <MinusCircleOutlined />, condition: isAdded },
            { onClick: () => handleCart(data, "add"), text: 'Add To Cart', icon: <PlusCircleOutlined />, condition: !isAdded }
        ]
        return btn.map((item) => {
            return item.condition ? <button className="product__button" onClick={item.onClick}> {item.text} {item.icon} </button> : ''
        })
    }

    return (
        <div>
            <div className="product__card">
                <div className="product__image">
                    <img src={`http://localhost:8090/${data?.file}`} alt={`${data?.title} Product`} />
                </div>
                <div className="product__details">
                    <h2 className="product__title">{data?.title}</h2>
                    <p className="product__price">₹{data?.price}</p>
                    <p className="product__description">{data?.description}</p>
                    <p> {quantity && ` Quantity : ${quantity}`}</p>
                    {
                        showBtn && getBtn()
                    }

                </div>
            </div>

            {
                !showBtn && cartBtn &&
                <div className='cart__btn'>
                    <Button danger onClick={onCount} >-</Button>{count}<Button type="primary" onClick={() => onCount('inc')}>+</Button>
                </div>
            }

        </div>
    )
}

export default ProductInfo