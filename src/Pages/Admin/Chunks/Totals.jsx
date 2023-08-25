import { ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Totals = ({ data, products }) => {
    const [, setsearchParams] = useSearchParams()
    const totalData = [
        {
            title: 'Total users',
            key: 'users',
            icon: <UserOutlined />,
            value: data?.length
        },
        {
            title: 'Total orders',  
            key: 'orders',
            icon: <ShoppingCartOutlined />,
            value: 0
        },
        {
            title: 'Total products',
            key: 'products',
            icon: <ShopOutlined />,
            value: products?.length
        }
    ]
    return (
        <div className='totals'>
            <h2>PrCart -- 2023</h2>
            <h4>Users & Orders</h4>
            <div className='totals__wrapper'>
                {
                    totalData.map((item) => {
                        return (
                            <div className='totals__users' onClick={() => setsearchParams({ show: item.key })}>
                                <span>
                                    {item.title}
                                </span>
                                <span>
                                    {item.icon}
                                    <span>
                                        {item.value}
                                    </span>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Totals