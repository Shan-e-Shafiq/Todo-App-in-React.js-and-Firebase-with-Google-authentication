import React, { useContext, useState, useRef } from 'react'
import light_image from '../assets/bg-desktop-light.jpg'
import dark_image from '../assets/bg-desktop-dark.jpg'
import { LightTheme, DarkTheme } from '../../Themes'
import { Context } from '../GlobalContext'
import { Link } from 'react-router-dom'
import useFirebase from '../../customHooks/useFirebase'
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
  // FUNCTIONS
  function handleThemeChange() {
    isDark ? setisDark(false) : setisDark(true)
  }
  function handleShowPassword() {
    showPasswordRef.current.checked ? setshowPassword(true) : setshowPassword(false)
  }
  async function handleLogin(e) {
    e.preventDefault()
    let userdata = {}
    const formData = new FormData(e.target)
    formData.forEach((value, key) => {
      userdata[key] = value
    })
    if (!userdata.email.endsWith('.com')) {
      alert("Invalid email address! ⚠")
      return
    } else {
      setLoader(true)
      await Login_user(userdata.email, userdata.password)
      setLoader(false)
      navigate('/')
    }
  }
  async function handleGoogleAuth() {
    await Google_Auth()
    navigate('/')
  }

  // VARIABLES
  const { isDark, setisDark, setLoader } = useContext(Context)
  const [showPassword, setshowPassword] = useState(false)
  const showPasswordRef = useRef(null)
  const { Login_user, Google_Auth } = useFirebase()
  const InputFieldStyle = {
    backgroundColor: 'transparent',
    borderColor: isDark ? '#60c8ff' : '#7d2dff',
    color: isDark ? 'white' : LightTheme.textColor
  }
  const navigate = useNavigate()

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
            backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor,
            padding: '20px',
            color: isDark ? DarkTheme.textColor : LightTheme.textColor
          }}
        >
          {/* email address */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input style={InputFieldStyle} type='text' className="form-control" name='email' required={true} />
          </div>
          {/* password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input style={InputFieldStyle} type={showPassword ? 'text' : 'password'} className="form-control" name='password' required={true} />
          </div>
          {/* checkbox */}
          <div className="mb-3 form-check">
            <input ref={showPasswordRef} onClick={handleShowPassword} type="checkbox" className="form-check-input" />
            <label className="form-check-label" >Show password</label>
          </div>
          {/* form buttons */}
          <div className="form_buttonContainer flex">
            <button type='submit'>Login</button>
            <button type='button' onClick={handleGoogleAuth}
              style={{
                color: '#60c8ff',
                background: 'transparent',
                border: '2px solid #60c8ff'
              }}
            >Continue with Google</button>
            <div>Don't have an account? <Link to={'/signup'} style={{ color: '#60c8ff', textDecoration: 'none' }}>Create one</Link></div>
          </div>
        </form>
      </div>
    </div>
  )
}
