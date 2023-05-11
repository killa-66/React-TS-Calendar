import React, { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { rules } from './utils/rules';

interface Props {}

const LoginForm: FC = () => {
  return (
    <Form>
      <Form.Item
      label="Имя пользователя"
      name="username"
      rules={[rules.required('Пожалуйста введите имя пользователя')]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Пароль"
      name="password"
      rules={[rules.required('Пожалуйста введите пароль')]}
    >
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Войти
      </Button>
    </Form.Item>
    </Form>
  )
};

export default LoginForm;