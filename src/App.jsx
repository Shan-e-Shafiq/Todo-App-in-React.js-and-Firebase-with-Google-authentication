import './App.css'
import React from 'react'
import TodoContainer from './components/TodoContainer'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import GlobalContext from './GlobalContext'

export default function App() {

  return (
    <>
      <GlobalContext>
        <Navbar />
        <Routes>
          <Route path='/' element={<TodoContainer />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </GlobalContext>
    </>
  )
}
