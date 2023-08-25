import Search from 'antd/es/input/Search'
import React, { useState } from 'react'

const HeaderSearch = () => {
    const [search, setsearch] = useState("mobile");

    const onSearch = (value) => {
        setsearch(value)
        console.log(value,search);
    }
    const searchField = [
        {
            img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ficons%2Fwebsite&psig=AOvVaw12QDHVc2O9YxMawf1GDx-T&ust=1692927537947000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNCC_dWU9IADFQAAAAAdAAAAABAE',
        },
        {
            element: <Search
                placeholder="Search product"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />
        }
    ]

    return (
        <div className="header__search">
            <span className="header__navItem__search">
                {
                    searchField.map((item) => {
                        return (
                            item.img ? <img src={item.img} alt="" /> :
                                item.element
                        )
                    })
                }
            </span>
        </div>)
}

export default HeaderSearch