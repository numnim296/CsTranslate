import React from 'react'
import { Switch, Route } from 'react-router'
import LogIn from '../views/Login'
import MainPage from '../views/Translate'



const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={LogIn} />
      {/* <Route path="/profile" component={Profile} /> */}
      {/* <Route path="*" component={LogIn} /> */}
      {/* <Route exact path="/" component={Example}/> */}
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/trans" component={MainPage} />
      <Route exact path="*" component={MainPage} />
      
    </Switch>
  )
}

export default Routing
