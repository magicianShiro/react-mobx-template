
import React from 'react'
import SvgIcon from '@/components/SvgIcon'
import { inject, observer }  from 'mobx-react'
import './index.less'

function Home(props) {
  const { demo } = props
  return (
    <div>
      <p>Home</p>
      <p onClick={() => demo.changeTest('hello')}>{ demo.test }</p>
      <p onClick={() => demo.changeTest('world')}>{ demo.comTest }</p>
      <SvgIcon iconClass="logo" styleName='test-icon' />
      { props.children }
    </div>
  )
}

export default inject('demo')(observer(Home))