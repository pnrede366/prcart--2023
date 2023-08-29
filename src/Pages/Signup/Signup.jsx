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

  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isMobileValid = /^[0-9]{10}$/.test(formData.mobileNumber);
    const isPasswordValid = /^.{8,}$/.test(formData.password)

    if (!formData?.mobileNumber || !formData.email || !formData.username || !formData.password || !formData.name) {
      notification.error({ message: 'Please fill all the required fields' })
    }
    else if (formData.password !== formData.confirmPassword) {
      notification.error({ message: 'password & confirm password' })
    }
    else if (!isMobileValid) {
      notification.error({ message: 'mobile number not valid' })
    }
    else if (!isPasswordValid) {
      notification.error({ message: 'password should be minimum 8 char' })
    }
    else {
      let res = await createUser(formData)
      if (res.data) {
        notification.info({ message: 'Signup successfully' })
        setFormData(initialData)
      }
      if (res.error) {
        notification.error({ message: res.error.data.message })
      }

    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Signup Form</h1>
      {
        fields.map((item) => generateForm(item, formData, setFormData))
      }
      <div className="form__button__wrapper">
        <button className="form__button" type="submit">Sign Up</button>
        <button className="form__button" onClick={() => navigate('/login')}>Login</button>
      </div>
      {contextHolder}
    </form>
  );
};

export default Signup;
