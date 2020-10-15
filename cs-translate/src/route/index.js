import React from 'react'
import LogIn from '../views/Login'
import SignUp from '../views/SignUp';
import MainPage from '../views/Translate'
import MainAppBar from '../Layout/Main'
import History from '../views/History'
import Setting from '../views/Setting'
import Test2 from '../views/test2';
import AdminTran from '../views/AdminTran';
import AdminHostory from '../views/AdminHistory'
import AdminSetting from '../views/AdminSetting'
import AdminMainAppBar from '../Layout/AdminMain'
import AdminMain from '../views/AdminMain'
import AdminRecommend from '../views/AdminRecommend'

// import { Navigate } from 'react-router-dom';


const routes = [

  {
    path: '/',
    element:<MainAppBar/>,
    children: [
      { path: '/', element: <MainPage/>},
      { path: 'history', element: <History/>},
      { path: 'trans', element: <MainPage/>},
      { path: 'setting', element: <Setting/>},
      { path: 'test2', element: <Test2/>},
      // { path: 'admin', element: <App11/>},
      // {path:'signup',element: <SignUp/>}
      // { path: '*', element: <Navigate to="/404" /> },
    ]
  },
  {
    path: 'admin',
    element:<AdminMainAppBar/>,
    children: [
      { path: '/', element: <AdminMain/>},
      { path: 'history', element: <AdminHostory/>},
      { path: 'trans', element: <AdminTran/>},
      { path: 'setting', element: <AdminSetting/>},
      { path: 'recommend', element: <AdminRecommend/>},
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
