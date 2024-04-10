import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../GlobalContext';
import useFirebase from '../../customHooks/useFirebase';

export default function Navbar() {

  // FUNCTIONS

  function handleLogin() {
    navigate('/login')
  }
  function handleSignup() {
    navigate('/signup')
  }
  async function handleLogout() {
    setLoader(true)
    await LogOut_user()
    setLoader(false)
    setTodos([])
    setTodos2([])
  }

  // VARIABLES

  const navigate = useNavigate()
  const { UserDetails, isLoggedIn, setLoader, setTodos, setTodos2 } = useContext(Context)
  const { LogOut_user } = useFirebase()

  return (
    <>
      <nav className="navbar fixed-top"
        style={{
          backgroundColor: 'transparent',
          paddingInline: '20px'
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand"
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '10px'
            }}
            to={'/'}
          >TODO</Link>

          {/* CONDITIONAL RENDERING */}
          {
            isLoggedIn ?
              <div className='d-flex UserDetails'
                style={{
                  color: 'white'
                }}
              >
                <div className='ProfilePic flex'>
                  {
                    UserDetails.photo == null ?
                      <i className="fa-solid fa-user"></i>
                      :
                      <img src={UserDetails.photo} alt="" />
                  }
                </div>
                <div className='Username' style={{ fontSize: '18px', fontWeight: 600 }}>
                  {
                    UserDetails.name == null ? UserDetails.email : UserDetails.name
                  }
                </div>
                <button className='btn' onClick={handleLogout}>Log out</button>
              </div>
              :
              <div className="d-flex LoginSignup" role="search">
                <button className="btn" onClick={handleLogin}>Login</button>
                <button className="btn" onClick={handleSignup}>Signup</button>
              </div>
          }
        </div>
      </nav>
    </>
  )
}
