import { Layout, Menu, Row } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteNames } from '../router'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Navbar: FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(RouteNames.LOGIN);
  };

  const {isAuth} = useTypedSelector(state => state.auth)
  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth 
          ?
          <Menu theme="dark" mode="horizontal" selectable={false}>
          <div style={{color: 'white'}}>User</div>
            <Menu.Item onClick={() => {console.log('Exit')}} key={1}>Выйти</Menu.Item>
          </Menu>
          :
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={handleClick} key={1}>Логин</Menu.Item>
          </Menu>
          
         }
        
      </Row>
    </Layout.Header>
  )
}

export default Navbar