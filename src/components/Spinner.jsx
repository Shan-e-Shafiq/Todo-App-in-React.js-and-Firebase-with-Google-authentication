import React, { useContext } from 'react'
import { Context } from '../GlobalContext'
import { LightTheme, DarkTheme } from '../../Themes'

export default function Spinner() {
  // VARIABLES
  const { isDark } = useContext(Context)
  return (
    <div className='spinner_container'>
      <div className="spinner-border spinner"
        style={{
          width: '3rem',
          height: '3rem',
          color: isDark ? DarkTheme.textColor : LightTheme.textColor,
        }}
        role={'status'}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
