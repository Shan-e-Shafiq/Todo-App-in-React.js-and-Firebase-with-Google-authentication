import React, { useContext, useState, useRef } from 'react'
import light_image from '../assets/bg-desktop-light.jpg'
import dark_image from '../assets/bg-desktop-dark.jpg'
import { LightTheme, DarkTheme } from '../../Themes'
import { Context } from '../GlobalContext'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  // FUNCTIONS
  function handleThemeChange() {
    isDark ? setisDark(false) : setisDark(true)
  }
  function handleShowPassword() {
    showPasswordRef.current.checked ? setshowPassword(true) : setshowPassword(false)
  }
  function handleLogin(e) {
    e.preventDefault()
    console.log('hello')
  }

  // VARIABLES
  const { isDark, setisDark } = useContext(Context)
  const [showPassword, setshowPassword] = useState(false)
  const showPasswordRef = useRef(null)

  // CODE

  // RETURN
  return (
    <div className='MainContainer flex'
      style={{
        backgroundColor: isDark ? DarkTheme.MaincontainerColor : LightTheme.MaincontainerColor,
        userSelect: 'none'
      }}
    >
      <img src={isDark ? dark_image : light_image} alt="" />

      <div className='TodoContainer flex'>

        {/* ################ HEADER ################ */}

        <div className="header flex" style={{ color: 'white' }}>
          <div
            style={{
              fontSize: '34px',
              fontWeight: 700,
              letterSpacing: '10px',
              color: 'white'
            }}
          >LOGIN</div>
          <div onClick={handleThemeChange}>
            {
              isDark ? <i className='bx bxs-sun'></i> : <i className='bx bxs-moon'></i>
            }
          </div>
        </div>

        <form onSubmit={handleLogin} className='form_Container'
          style={{
            backgroundColor: DarkTheme.TodoContainerColor,
            padding: '20px',
            color: DarkTheme.textColor
          }}
        >
          {/* EMAIL */}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required={true} />
          </div>
          {/* PASSWORD */}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
            <input type={showPassword ? 'text' : 'password'} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required={true} />
          </div>
          {/* CHECKBOX */}
          <div className="mb-3 form-check">
            <input ref={showPasswordRef} onClick={handleShowPassword} type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Show password</label>
          </div>

          <div className="form_buttonContainer flex">
            <button type='submit'>Login</button>
            {/* <button
              style={{
                color: '#60c8ff',
                background: 'transparent',
                border: '2px solid #60c8ff'
              }}
            >Continue with Google</button> */}
            <div>Don't have an account? <Link to={'/signup'} style={{ color: '#60c8ff', textDecoration: 'none' }}>Create one</Link></div>
          </div>
        </form>

      </div>
    </div>
  )
}
