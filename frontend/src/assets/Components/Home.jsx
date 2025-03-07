import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import axios from 'axios'

import { useState , useEffect } from 'react';
const Home = () => {
  const onFinish = async(values) => {
    console.log  ('Success:', values);
    await axios.post(`http://localhost:3000/adduser`,values)
    console.log('user added');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [user, setUser] = useState([]);

  
  

let allUser=async()=>
{
  let value =await axios.get(`http://localhost:3000/adduser`);

  console.log(value.data);
  
}
useEffect(() => {
  allUser();
}, []);
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Home;