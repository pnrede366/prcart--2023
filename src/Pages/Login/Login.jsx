import React, { useState } from 'react';
import './login.scss';
import { fields, generateForm } from './constant';
import { useNavigate } from 'react-router';
import { useLoginUserMutation } from '../../Service/getUsers';
import { message, notification } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [data, setdata] = useState(
    {
      username: '',
      password: '',
    }
  )
  const [api, contextHolder] = notification.useNotification();

  const [loginUser, response] = useLoginUserMutation()

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await loginUser(data)
    if (res.data) {
      document.cookie = `token= ${res?.data?.token}`
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
        <button type="submit">Login</button>
        <div className='login__form__signup' onClick={() => navigate('/signup')}>
          didn't have account? signup
        </div>
      </form>
      {contextHolder}

    </div>
  );
};

export default LoginForm;
