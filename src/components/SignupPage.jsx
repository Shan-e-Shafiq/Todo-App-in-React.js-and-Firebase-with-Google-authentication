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
  function handleSignup(e) {
    e.preventDefault()
    let dataObject = {}
    const formData = new FormData(e.target)
    formData.forEach((value, key) => {
      dataObject[key] = value
    })
  }

  // VARIABLES
  const { isDark, setisDark } = useContext(Context)
  const [showPassword, setshowPassword] = useState(false)
  const showPasswordRef = useRef(null)
  const InputFieldStyle = {
    backgroundColor: 'transparent',
    borderColor: isDark ? '#60c8ff' : '#7d2dff',
    color: isDark ? 'white' : LightTheme.textColor
  }

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

        {/* form header */}

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

        <form onSubmit={handleSignup} className='form_Container'
          style={{
            backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor,
            padding: '20px',
            color: isDark ? DarkTheme.textColor : LightTheme.textColor
          }}
        >
          {/* name */}
          <div className="mb-3 InputField">
            <label className="form-label">Name</label>
            <input style={InputFieldStyle} type='text' className="form-control" name='name' required={true} />
          </div>
          {/* email address */}
          <div className="mb-3 InputField">
            <label className="form-label">Email address</label>
            <input style={InputFieldStyle} type='text' className="form-control" name='email' required={true} />
          </div>
          {/* password */}
          <div className="mb-3 InputField">
            <label className="form-label">Password</label>
            <input style={InputFieldStyle} type={showPassword ? 'text' : 'password'} className="form-control" name='password' required={true} />
          </div>
          {/* confirm password */}
          <div className="mb-3 InputField">
            <label className="form-label">Confirm password</label>
            <input style={InputFieldStyle} type={showPassword ? 'text' : 'password'} className="form-control" name='c_password' required={true} />
          </div>
          {/* checkbox */}
          <div class="mb-3 form-check">
            <input ref={showPasswordRef} onClick={handleShowPassword} type="checkbox" className="form-check-input" />
            <label class="form-check-label">Show password</label>
          </div>
          {/* form buttons */}
          <div className="form_buttonContainer flex">
            <button type='submit'>Continue</button>
            <div>Already have an account? <Link to={'/login'} style={{ color: '#60c8ff', textDecoration: 'none' }}>Login</Link></div>
          </div>

        </form>

      </div>
    </div>
  )
}
