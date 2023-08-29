import { ShoppingCartOutlined, UserOutlined, LoginOutlined, TeamOutlined, HomeOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getField, getFieldHeader } from '../../../Helper/constant'

const HeaderActions = () => {
    const navigate = useNavigate()
    const cart = useSelector((state) => state.CartReducer)

    const actions = [
        {
            icon: <HomeOutlined style={{ fontSize: '2rem', }} />,
            text: 'Home',
            path: '/'
        },
        {
            icon: <ShoppingCartOutlined style={{ fontSize: '2rem', }} />,
            text: cart.length,
            path: '/cart'
        },
        {
            text: 'login',
            icon: <LoginOutlined />,
            path: '/login'
        },
        {
            text: 'admin',
            icon: <TeamOutlined />,
            path: '/admin'
        },
        {
            icon: <UserOutlined />,
            text: 'user',
            path: `/user`
        }
    ]


    return (
        <div>
            <div className="header__category">

                {
                    actions.map((item, index) => {
                        return (
                            <div key={index} >
                                {getFieldHeader(item,navigate)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HeaderActions
