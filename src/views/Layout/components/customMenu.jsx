import React, { useState, useEffect, useMemo } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import constantRoutes from '@/router/config'

let parentPaths = {}


const renderMenuItem = (parentPath, { icon, path, title }) => {
  const currentPath = (parentPath[parentPath.length - 1] ?? '') + path

  parentPaths[currentPath] = parentPath;
  
  return (
    <Menu.Item key={currentPath}>
      <Link to={currentPath}>
        {icon && <Icon type={icon} />}
        <span>{title}</span>
      </Link>
    </Menu.Item>
  )
}

const renderSubMenu = (parentPathArr, { path, icon, title, children }) => {
  return (
    <Menu.SubMenu 
      key={path}
      title={
        <span>
          {icon && <Icon type={icon} />}
          <span>{title}</span>
        </span>
      }
    >
      {
        children && children.map(route => {
          // console.log('==============')
          const a = [...parentPathArr];
          a.push(route.path)
          // console.log(a)
          return (
            route.children && route.children.length > 0 
              ? renderSubMenu([...parentPathArr].push(route.path), route)
              : renderMenuItem(parentPathArr, route)
          )
        })
      }
    </Menu.SubMenu>
  )
}

const getMenuItem = () => {
  return constantRoutes.filter(v => v.show !== false).map(route => {
    return (
      route.children && route.children.length > 0
        ? renderSubMenu([route.path], route)
        : renderMenuItem([], route)
    )
  })
}


function CustomMenu(props) {
  const [openKeys, setOpenKeys] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const { theme, location } = props
  
  
  useEffect(() => {
    const path = location.pathname;
    let openPath = parentPaths[path]
    if(openPath?.length > 0) {
      setOpenKeys(openPath)
    }
    setSelectedKeys([path])
  }, [location])



  const onOpenChange = (keys) => {
    let len = keys.length;
    setOpenKeys(keys)
    if (len > 0) {
      setOpenKeys([keys[len - 1]])
    }
  }

  const menuItem = useMemo(() => getMenuItem(), [])
  
  return (
    <div>
      <Menu
        onOpenChange={onOpenChange}
        onClick={ ({ key }) => setSelectedKeys([key]) }
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        theme={ theme ?? 'dark' }
        mode='inline'>
        {
          
          // constantRoutes.filter(v => v.show !== false).map(route => {
          //   return (
          //     route.children && route.children.length > 0
          //       ? renderSubMenu([route.path], route)
          //       : renderMenuItem([], route)
          //   )
          // })
          // menuItem()
          // <CustomMenuItem />
          menuItem
        }
      </Menu>
    </div>
  )
}

export default withRouter(CustomMenu)