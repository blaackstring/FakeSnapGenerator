import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import  Home  from '../src/components/Home.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import Userhome from './components/Userhome.jsx'
import { ToastContainer } from 'react-toastify'
import ResetPassword from './components/ResetPassword.jsx'
import ForgetPassword from './components/ForgetPassword.jsx'


const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {index:true,
      element:<Home/>
    }
    ,
    {
  path:"/login",
      element:<Login/>
    },
    {
      path:"signup" ,
      element:<Signup/>
    },
    {
      path:"userhome" ,
      element:<Userhome/>
    },
    {
      path:'/resetPassword/:token',
      element:<ResetPassword/>
    },
    {
      path:'/forgetPassword',
      element:<ForgetPassword/>
    }
  ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    <ToastContainer />
      </Provider>
  </StrictMode>,
)
