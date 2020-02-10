import React, { useEffect } from 'react'
import loadable from '@loadable/component'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

function LoadingPage() {
  useEffect(() => {
    NProgress.start()
    return () => NProgress.done();
  }, [])
  return <div />
}

const LoadableRoute = (component) => {
  return loadable(component, {
    fallback: <LoadingPage />
  })
}

export default LoadableRoute