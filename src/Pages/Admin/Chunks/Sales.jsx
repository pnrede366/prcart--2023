import { Button, Table, notification } from 'antd';
import React, { useState } from 'react'
import { productInitial } from '../constant';
import { useDeleteUserMutation } from '../../../Service/getUsers';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import AddProduct from './AddProduct';
import { useCreateProductsMutation, useDeleteProductsMutation, useFindProductMutation, useUpdateProductsMutation } from '../../../Service/product';
import { deleteId, deleteProductById, editHandler } from '../../../Helper/utility';


const Sales = ({ users, products }) => {
  const [deleteUser,] = useDeleteUserMutation()
  const [deleteProduct] = useDeleteProductsMutation()
  const [updateProduct] = useUpdateProductsMutation()
  const [searchParams,] = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState(productInitial);
  const [createProduct,] = useCreateProductsMutation()
  const [isUpdate, setisUpdate] = useState(false)
  const [findById] = useFindProductMutation()
  let show = searchParams.get('show')

  const userColumns = [
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
      title: 'features',
      dataIndex: 'features',
      key: 'features',
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
      console.log(formData);
      let res = await updateProduct({ id: isUpdate, data: formData })
      console.log(res, isUpdate, formData);
      if (res?.data?.success) {
        notification.info({ message: 'product updated' })
      }
      setisUpdate(false)
    }
    // for create data
    else {
      let res = await createProduct(formData)
      if (res.data.success) {
        notification.info({ message: 'product added' })
      }
    }
  };

  const getTable = (show) => {
    if (show === 'users') {
      return <Table dataSource={users} columns={userColumns} />
    }
    else if (show === "products") {
      return <Table dataSource={products} columns={productColumns} />
    }
  }

  return (
    <div className='admin'>
      {
        show === "products" && <Button className='admin__addProduct' onClick={() => setIsModalOpen(true)}>Add Product <PlusCircleOutlined /></Button>
      }
      <AddProduct isUpdate={isUpdate} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} formData={formData} setFormData={setFormData} handleOk={handleOk} />
      <div className="admin__sales__report">
        {
          getTable(show)
        }
      </div>
    </div>
  )
}

export default Sales