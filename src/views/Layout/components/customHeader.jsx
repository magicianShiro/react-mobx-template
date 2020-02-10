import React from 'react'
import { Icon } from 'antd'
import styles from '../index.less'

function Customheader (props) {
  const { collapsed, onToggle } = props
  
  return (
    <div>
      <Icon
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        className={styles.trigger}
        onClick={onToggle} />
    </div>
  )
}

export default Customheader