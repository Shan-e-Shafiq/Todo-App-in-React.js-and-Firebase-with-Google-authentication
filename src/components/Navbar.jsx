import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

  // FUNCTIONS

  function handleLogin() {
    navigate('/login')
  }
  function handleSignup() {
    navigate('/signup')
  }

  // VARIABLES

  const navigate = useNavigate()

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
          <div className="d-flex LoginSignup" role="search">
            <button className="btn" onClick={handleLogin}>Login</button>
            <button className="btn" onClick={handleSignup}>Signup</button>
          </div>
        </div>
      </nav>
    </>
  )
}
