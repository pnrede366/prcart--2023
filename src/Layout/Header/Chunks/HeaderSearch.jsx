import Search from 'antd/es/input/Search'
import React, { useEffect, useState } from 'react'
import { useGetSearchMutation } from '../../../Service/category';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../Redux/Slice/product';
import { useGetProductsQuery } from '../../../Service/product';
import { logo } from '../../../Helper/iconpath';
import { useNavigate } from 'react-router';

const HeaderSearch = () => {
    const [search, setsearch] = useState();
    const [getSearch] = useGetSearchMutation()
    const { data } = useGetProductsQuery()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSearch = async (e) => {
        console.log(e);
        setsearch(e.target.value)
    }
    useEffect(() => {
        const fetchData = async () => {
            if (search?.length) {
                const res = await getSearch(search);
                if (res.data) {
                    dispatch(addProduct(res.data));
                }
            }
            else {
                dispatch(addProduct(data))
            }
        };

        fetchData();
    }, [search, dispatch, getSearch]);
    const searchField = [
        {
            img: logo,
            onclick: () => navigate('/')
        },
        {
            element: <Search
                placeholder="Search product"
                onChange={onSearch}
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
                            <span onClick={item.onclick}> 
                                {
                            item.img ? <img src={item.img} alt="" /> :
                                item.element
                                }
                            </span>
                        )
                    })
                }
            </span>
        </div>)
}

export default HeaderSearch