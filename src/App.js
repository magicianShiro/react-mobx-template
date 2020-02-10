import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
// import DemoStore from '@/store/demo'
import AuthRoute from '@/router/authRoute'
import store from '@/store'
import './App.css';

// const store = new DemoStore()

function App() {
  const router = (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <AuthRoute path="/" component={Layout} />
        {/* <Route path="/" component={Layout} /> */}
      </Switch>
    </Router>
  )
  
  
  return (
    <Provider { ...store }>
      { router }
    </Provider>
  );
}

export default App;
