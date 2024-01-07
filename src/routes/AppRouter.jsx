import React from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../auth/Login'
import Register from '../auth/Register'
import { useAuth } from '../hooks/useAuth'
import EditEvent from '../pages/EditEvent'
import NewEvent from '../pages/NewEvent'
import Profile from '../pages/Profile'
import ShowEvent from '../pages/ShowEvent'
import OwnEvents from '../pages/OwnEvents'



const Protected = (element) => {
  const { isAuthenticated, token } = useAuth()
  return isAuthenticated || token ? element : <Navigate to={"/login"} replace />
}

 /*
  events/:_id
  events/edit/:_id
  events/new
  events/user
  */

const AppRouter = () => {
  const { isAuthenticated, } = useAuth()
  return (
    <Routes>

      <Route path='/' element={isAuthenticated ? <Navigate to={"/home"} replace /> : <Login />} />


      <Route path='/login' element={isAuthenticated ? <Navigate to={"/home"} replace /> : <Login />} />
      <Route path='/register' element={isAuthenticated ? <Navigate to={"/home"} replace /> : <Register />} />
      <Route path='/home' element={Protected(<Home />)} />
      <Route path="/edit/:_id" element={Protected(<EditEvent />)} />
      <Route path="/new" element={Protected(<NewEvent />)} />
      <Route path="/event/:_id" element={Protected(<ShowEvent />)} />
      <Route path="/events/own" element={Protected(<OwnEvents />)} />
      <Route path="/profile" element={Protected(<Profile />)} />


    </Routes>
  )
}

export default AppRouter

