import { Button, Table, notification } from 'antd';
import React, { useState } from 'react'
import { productInitial } from '../constant';
import { useDeleteUserMutation } from '../../../Service/getUsers';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import ModalComp from './ModalComp';
import { useCreateProductsMutation, useDeleteProductsMutation, useFindProductMutation, useFindSingleProductMutation, useFindSingleProductQuery, useUpdateProductsMutation } from '../../../Service/product';
import { deleteId, deleteProductById, editHandler } from '../../../Helper/utility';
import { useGetCategoryQuery } from '../../../Service/category';


const Sales = ({ users, products, orders }) => {
  const [deleteUser,] = useDeleteUserMutation()
  const [deleteProduct] = useDeleteProductsMutation()
  const [updateProduct] = useUpdateProductsMutation()
  const [searchParams,] = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState(productInitial);
  const [createProduct,] = useCreateProductsMutation()
  const [isUpdate, setisUpdate] = useState(false)
  const [findById] = useFindSingleProductMutation()
  let show = searchParams.get('show')
  const { data } = useGetCategoryQuery()
  const orderColumn = [
    {
      title: 'productId',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'userId',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ]

  const formFieldProduct = [
    {
      label: 'Title:',
      type: 'text',
      id: 'title',
      placeholder: 'title',
      name: "title"
    },
    {
      label: 'price:',
      type: 'number',
      id: 'price',
      placeholder: 'price',
      name: "price"
    },
    {
      label: 'description:',
      type: 'text',
      id: 'description',
      placeholder: 'description',
      name: "description"
    },
    {
      label: 'category:',
      type: 'select',
      id: 'category',
      placeholder: 'category',
      name: "category",
      options: data?.result.map((item) => item.type)
    },
    {
      label: 'file:',
      type: 'file',
      id: 'file',
      placeholder: 'file',
      name: "file",
    },
  ]

  const userColumns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'mobileNumber',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '',
      key: '_id',
      dataIndex: '_id',
      render: (data) => (
        <>
          {
            <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteId(data, deleteUser)} />
          }
        </>
      ),
    },
  ];

  const productColumns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'img',
      dataIndex: 'file',
      key: 'file',
      render: (data) => {
        return <img src={`http://localhost:8090/${data}`} alt="img" />
      }
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '',
      key: '_id',
      dataIndex: '_id',
      render: (data) => (
        <>
          {
            <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteProductById(data, deleteProduct)} />
          }
        </>
      ),
    },
    {
      title: '',
      key: '_id',
      dataIndex: '_id',
      render: (data) => (
        <>
          {
            <EditOutlined style={{ color: 'green' }} onClick={() => editHandler(data, setisUpdate, findById, setFormData, setIsModalOpen)} />
          }
        </>
      ),
    },
  ];

  const handleOk = async () => {
    setIsModalOpen(false);
    // for update
    if (isUpdate) {

      const newformData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        newformData.append(key, value)
      });

      let res = await updateProduct({ id: isUpdate, data: newformData })
      console.log(res, isUpdate, formData);
      if (res?.data?.success) {
        notification.info({ message: 'product updated' })
      }
      setisUpdate(false)
    }
    // for create data
    else {
      if (formData) {
        const newformData = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
          newformData.append(key, value)
        });
        
        let res = await createProduct(newformData)
        if (res?.data?.success) {
          notification.info({ message: 'product added' })
        }
        if (res.error) {
          notification.error({ message: res.error.data?.message })
        }
      }
      else {
        notification.error({ message: 'fill all fields' })

      }
    }
    setFormData(productInitial)
  };

  const getTable = (show) => {
    if (show === 'users') {
      return <Table dataSource={users} columns={userColumns} />
    }
    else if (show === "products") {
      return <Table dataSource={products} columns={productColumns} />
    }
    else {
      if (orders) {
        return <Table dataSource={orders} columns={orderColumn} />
      }
    }
  }

  return (
    <div className='admin'>
      {
        show === "products" && <Button className='admin__addProduct' onClick={() => setIsModalOpen(true)}>Add Product <PlusCircleOutlined /></Button>
      }
      <ModalComp formFieldProduct={formFieldProduct} title="Add Product +" comp='products' isUpdate={isUpdate} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formData={formData} setFormData={setFormData} handleOk={handleOk} />
      <div className="admin__sales__report">
        {
          getTable(show)
        }
      </div>
    </div>
  )
}

export default Sales