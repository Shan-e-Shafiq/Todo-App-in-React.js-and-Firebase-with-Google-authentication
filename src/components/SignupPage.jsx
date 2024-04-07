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

      <div className='FormContainer flex'>

        {/* ################ HEADER ################ */}

        <div className="header flex" style={{ color: 'white' }}>
          <div
            style={{
              fontSize: '34px',
              fontWeight: 700,
              letterSpacing: '10px',
              color: 'white'
            }}
          >SIGNUP</div>
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
          {/* NAME */}
          <div class="mb-3">
            <label htmlFor="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required={true} />
          </div>
          {/* EMAIL */}
          <div class="mb-3">
            <label htmlFor="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required={true} />
          </div>
          {/* PASSWORD */}
          <div class="mb-3">
            <label htmlFor="exampleFormControlInput1" class="form-label">Password</label>
            <input type={showPassword ? 'text' : 'password'} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required={true} />
          </div>
          {/* CONFIRM PASSWORD */}
          <div class="mb-3">
            <label htmlFor="exampleFormControlInput1" class="form-label">Confirm password</label>
            <input type={showPassword ? 'text' : 'password'} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required={true} />
          </div>
          {/* CHECKBOX */}
          <div class="mb-3 form-check">
            <input ref={showPasswordRef} onClick={handleShowPassword} type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" htmlFor="exampleCheck1">Show password</label>
          </div>

          <div className="form_buttonContainer flex">
            <button type='submit'>Continue</button>
            {/* <button
              style={{
                color: '#60c8ff',
                background: 'transparent',
                border: '2px solid #60c8ff'
              }}
            >Continue with Google</button> */}
            <div>Already have an account? <Link to={'/login'} style={{ color: '#60c8ff', textDecoration: 'none' }}>Login</Link></div>
          </div>
        </form>

      </div>
    </div>
  )
}
