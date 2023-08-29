import React from 'react'
import { useGetCategoryQuery, useGetCategorySearchMutation } from '../../../Service/category'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../Redux/Slice/product'
import { getField } from '../../../Helper/constant'
import { icons } from '../constant'

const HeaderItem = () => {
    const { data, isLoading } = useGetCategoryQuery()
    const [getCategorySearch] = useGetCategorySearchMutation()
    const dispatch = useDispatch()


    const searchHandler = async (item) => {
        const res = await getCategorySearch(item.type ?? "")
        console.log(res);
        dispatch(addProduct(res.data))
    }
 
    return (
        <div className='header__item'>  {
            data?.result?.map((item, index) =>
                <div key={index} onClick={() => searchHandler(item)}>
                    {getField(item,icons[index])}
                </div>)
        }</div>
    )
}

export default HeaderItem