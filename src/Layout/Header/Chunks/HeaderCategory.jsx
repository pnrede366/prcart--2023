import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

const HeaderCategory = () => {
    const navigate = useNavigate()

    const category = [
        {
            text: 'all products',
            dropdown: [
                { label: 'Air conditionor', key: 1 },
                { label: 'kitchen', key: 2 },
                { label: 'PC & Laptops', key: 3 }]
        },
        {
            text: 'Home appliances'
        },
        {
            text: 'Audio & video'
        },
        {
            text: 'Refrigerator'
        },
        {
            text: 'New arrivals'
        },
        {
            icon: <ShoppingCartOutlined />,
            onClick: () => console.log('cart')
        },
        {
            text: 'login',
            onClick: ()=> navigate('/login')
        }
    ]

    const getField = (item) => {
        if (item.dropdown) {
            return (
                <Dropdown menu={{ items: item.dropdown }} placement="bottomLeft" arrow={{ pointAtCenter: true }}>
                    <span>
                        {item.text}
                        <DownOutlined />
                    </span>
                </Dropdown>)
        }

        else {
            return <span className="header__category__item" onClick={item.onClick}>
                {item.icon ?? item.text}
            </span>
        }
    }
    return (
        <div>
            <div className="header__category">
                {
                    category.map((item, index) => {
                        return (
                            <div key={index}>
                                {getField(item)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HeaderCategory
