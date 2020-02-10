import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LoadableRoute from './loadableRoute.js'
import constantRoutes from './config'

/**
 * 
 * @param {Array} routes 
 */
const createRouter = (routes = constantRoutes, parentPath = '') => {
  return (
    routes.reduce((prev, route) => {
      const currentPath = parentPath + route.path
      if(route.redirect) {
        prev.push(<Redirect key={currentPath} exact from={currentPath} to={route.redirect} />)
      } 
      if (route.children && route.component) {
        const childRoutes = createRouter(route.children, currentPath)
        prev.push((
          <Route key={currentPath} path={currentPath} render={(props) => {
            Object.assign(props, {
              children: <Switch>{ childRoutes }</Switch>
            })
            return React.createElement(LoadableRoute(route.component), props)
          }} />
        ))
      } else if (route.children) {
        prev.push(...createRouter(route.children, currentPath))
      }
      prev.push(<Route key={currentPath} exact path={currentPath} component = {LoadableRoute(route.component)} />)
      
      return prev;
    }, [])
  )
}

const routes = createRouter(constantRoutes)


function Router() {
  
  return (
    <Switch>
      {/* {createRouter(constantRoutes)} */}
      { routes }
    </Switch>
  )
}

export default Router;