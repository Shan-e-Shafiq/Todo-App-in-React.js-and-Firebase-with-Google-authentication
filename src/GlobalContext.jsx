import React, { createContext, useState, useEffect } from 'react'
import useFirebase from '../customHooks/useFirebase'

export const Context = createContext()

export default function GlobalContext(props) {

  // VARIABLES

  const [isDark, setisDark] = useState(true)
  const [Todos, setTodos] = useState([])
  const [Todos2, setTodos2] = useState([])
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [UserDetails, setUserDetails] = useState(null)
  const [Loader, setLoader] = useState(false)
  const { initialize_database } = useFirebase({ setTodos, setTodos2, setisLoggedIn, setUserDetails, setLoader })

  // CODE

  const contextObject = { isDark, setisDark, Todos, setTodos, Todos2, setTodos2, isLoggedIn, setisLoggedIn, UserDetails, setUserDetails, Loader, setLoader }

  useEffect(() => {
    initialize_database()
  }, [])

  // RETURN
  return (
    <>
      <Context.Provider value={contextObject}>
        {props.children}
      </Context.Provider>
    </>
  )
}
