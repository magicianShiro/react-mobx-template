import React, { memo, useState } from 'react'
import { Layout } from 'antd'
import CustomMenu from './components/customMenu'
import CustomHeader from './components/customHeader'
import Router from '@/router';

import styles from './index.less'

const { Header, Content, Sider } = Layout

function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false)

  const toggleHandle = () => {
    setCollapsed(!collapsed)
  };
  
  return (
    <div id="page">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{height: '100vh', overflowY: 'auto'}}>
            <div className={styles.logo} />
            <CustomMenu />
          </div>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            {/* <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            /> */}
            <CustomHeader collapsed={collapsed} onToggle={toggleHandle} />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Router />
            {/* Content */}
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    </div> 
  )
}

export default memo(LayoutPage)