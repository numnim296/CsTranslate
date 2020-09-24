import React from 'react'
import { Route } from 'react-router'
import LogIn from '../views/Login'
import MainPage from '../views/Translate'

// import { Navigate } from 'react-router-dom';


const routes = [

  {
    path: '/',
    // element: <LandingMainLayout/>,
    children: [
      { path: '/', element: <LogIn/>},
      { path: 'login', element: <LogIn/>},
      { path: 'trans', element: <MainPage/>},
      // { path: '*', element: <Navigate to="/404" /> },
    ]
  },
 
];


export default routes;
