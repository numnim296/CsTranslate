import React from 'react'
import { Route } from 'react-router'
import LogIn from '../views/Login'
import SignUp from '../views/SignUp';
import MainPage from '../views/Translate'
import MainAppBar from '../Layout/Main'
import History from '../views/History'

// import { Navigate } from 'react-router-dom';


const routes = [

  {
    path: '/',
    element:<MainAppBar/>,
    children: [
      { path: '/', element: <MainPage/>},
      { path: 'history', element: <History/>},
      { path: 'trans', element: <MainPage/>},
      // {path:'signup',element: <SignUp/>}
      // { path: '*', element: <Navigate to="/404" /> },
    ]
  },

  {
    path: 'app',
    // element:<MainAppBar/>,
    children: [
      { path: '/', element: <LogIn/>},
      { path: 'login', element: <LogIn/>},
      // { path: 'trans', element: <MainPage/>},
      {path:'signup',element: <SignUp/>}
      // { path: '*', element: <Navigate to="/404" /> },
    ]
  },
 
];


export default routes;
