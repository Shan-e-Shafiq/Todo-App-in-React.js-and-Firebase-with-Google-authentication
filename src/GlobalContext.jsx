import React, { createContext, useState } from 'react'

export const Context = createContext()
export default function GlobalContext(props) {
  // FUNCTIONS

  // VARIABLES
  const dummytodo = [
    { id: 1, desc: "I have to work tomorrow", completed: false },
    { id: 2, desc: "Complete javascript course", completed: false },
    { id: 3, desc: "deploy MERN project", completed: true },
    { id: 4, desc: "develop a chat application tomorrow", completed: false },
  ]
  const [isDark, setisDark] = useState(true)
  const [Todos, setTodos] = useState(dummytodo)
  const [Todos2, setTodos2] = useState(dummytodo)
  // const [Todos, setTodos] = useState([])

  // CODE
  const contextObject = { isDark, setisDark, Todos, setTodos, Todos2, setTodos2 }

  return (
    <>
      <Context.Provider value={contextObject}>
        {props.children}
      </Context.Provider>
    </>
  )
}
