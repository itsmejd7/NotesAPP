import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar'
import Paste from './components/Paste'
import Home from './components/Home'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
[
{
  path:"/",
  element:
  <div>
      <Navbar/>
      <Home/>
  </div>
},
{
  path:"/pastes",
  element:
  <div>
      <Navbar/>
      <Paste/>
  </div>
},
{
  path:"/pastes/:id",
  element:
  <div>
       <Navbar/>
        <ViewPaste/>
  </div>
},
]
)


function App() {
  
  return (
    <>
       
        <RouterProvider router={router}/>
    </>
  )
}

export default App
