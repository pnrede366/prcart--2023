import React, { useState } from 'react';
import './signup.scss';
import { fields } from './constant';
import { generateForm } from '../Login/constant';
import { Button, message, notification } from 'antd';
import { AlertOutlined, CloseCircleOutlined, CloseOutlined, SmileOutlined } from '@ant-design/icons';
import { useCreateUserMutation } from '../../Service/getUsers';
import { useNavigate } from 'react-router';

const Signup = () => {
  const [api, contextHolder] = notification.useNotification();
  const [createUser, response] = useCreateUserMutation()
  const navigate = useNavigate()
  const initialData = {
    mobileNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    name: ''
  }
  const [formData, setFormData] = useState();

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    if (!formData?.mobileNumber || !formData.email || !formData.username || !formData.password || !formData.name) {
      api.open({
        key: "fsda",
        message: 'Please fill all the required fields',
        duration: 3,
        icon: <CloseCircleOutlined />,
        style: { color: 'red' }
      });
    } 
    else if (formData.password !== formData.confirmPassword) {
      api.open({
        key: "fsda",
        message: 'password & confirm password',
        description: 'not matched',
        duration: 3,
        icon: <CloseCircleOutlined />,
        style: { color: 'red' }

      });
    }
    else {
      let res = await createUser(formData)
      console.log(res);
      if (res.data) {
        api.open({
          key: "fsdas",
          message: 'Signup successfully',
          duration: 3,
          icon: <SmileOutlined />,
          style: { color: 'green' }
        })
      }
      if (res.error) {
        api.open({
          key: "fsdafds",
          message:res.error.data.message,
          duration: 3,
          icon: <AlertOutlined />,
          style: { color: 'red' }
        });
      }

    }
    setFormData(initialData)
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Signup Form</h1>
      {
        fields.map((item) => generateForm(item, formData, setFormData))
      }
      <div className="form__button__wrapper">
      <button className="form__button" type="submit">Sign Up</button>
      <button className="form__button" onClick={()=>navigate('/login')}>Login</button>
      </div>
      {contextHolder}
    </form>
  );
};

export default Signup;
