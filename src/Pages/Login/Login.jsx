import React, { useState } from 'react';
import './login.scss';
import { fields, generateForm } from './constant';
import { useNavigate } from 'react-router';
import { useGetUserByIdQuery, useLoginUserMutation } from '../../Service/getUsers';
import { message, notification } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addToken } from '../../Redux/Slice/auth';
import { storeUser } from '../../Redux/Slice/user';

const LoginForm = () => {
  const [data, setdata] = useState(
    {
      username: '',
      password: '',
    }
  )
  const { refetch } = useGetUserByIdQuery();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch()
  const [loginUser] = useLoginUserMutation()

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await loginUser(data)
    if (res.data) {
      document.cookie = `token= ${res?.data?.token}`
      dispatch(addToken({ token: res?.data.token }))
      let user = await refetch()
      dispatch(storeUser(user?.data?.result?.result))
      message.info('Login successful');
      navigate('/')
    }
    if (res.error) {
      api.open({
        key: "fsdfda",
        message: 'username or password is incorrect',
        duration: 3,
        icon: <CloseCircleOutlined />,
        style: { color: 'red' }

      });
    }
  };

  return (
    <div className="login__form__wrapper">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        {
          fields.map((item) => generateForm(item, data, setdata))
        }
        <button type="submit" >Login</button>
        <div className='login__form__signup' onClick={() => navigate('/signup')}>
          didn't have account? signup
        </div>
      </form>
      {contextHolder}

    </div>
  );
};

export default LoginForm;
