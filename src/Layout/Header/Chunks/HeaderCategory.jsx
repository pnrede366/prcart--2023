import { ShoppingCartOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router'
import { useGetCategoryQuery } from '../../../Service/category'
import { useSearchParams } from 'react-router-dom'

const HeaderCategory = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetCategoryQuery()
    const [, setSearchParams] = useSearchParams()

    const category = [
        {
            icon: <ShoppingCartOutlined />,
            onClick: () => console.log('cart')
        },
        {
            text: 'login',
            onClick: () => navigate('/login')
        },
        {
            text: 'admin',
            onClick: () => navigate('/admin')
        }
    ]

    const getField = (item) => {
        return <span className="header__category__item" onClick={item.type ? () => setSearchParams({ id: item._id }): item.onClick}>
            {item.type ?? item.icon ?? item.text}
        </span>

    }
    if (isLoading) {
       return <div>loading....</div> 
    }
    return (
        <div>
            <div className="header__category">
                {
                    data?.result?.map((item, index) =>
                        <div key={index}>
                            {getField(item)}
                        </div>)
                }
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
