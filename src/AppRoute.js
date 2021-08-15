import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Admin from './Admin';
import Login from './Login';

const checkLogin = () =>{
     if(localStorage.getItem('accessToken')){
          return true;
     }
     return false;
}
export default function AppRoute() {
     return (
          <BrowserRouter>
               <Switch>
                    <Route path="/admin" render = {() =>{
                         return checkLogin() ? <Admin/> : <Redirect to ="/"/>
                    }}>
                    </Route>
                    <Route path="/">
                         <Login/>
                    </Route>
               </Switch>
          </BrowserRouter>
     )
}
