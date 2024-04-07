import React, { useContext, useEffect, useState } from 'react'
import { LightTheme, DarkTheme } from '../../Themes'
import { Context } from '../GlobalContext'

export default function TodoItem(props) {

  // FUNCTIONS

  function handleClick() {
    isChecked ? setisChecked(false) : setisChecked(true)
    Todos.forEach(element => {
      if (element.id == props.todo.id) {
        props.todo.completed ? element.completed = false : element.completed = true
      }
    });
  }

  function handleDelete() {
    let NewArray = Todos.filter(e => {
      if (e.id != props.todo.id) {
        return e
      }
    })
    setTodos(NewArray)
    setTodos2(NewArray)
  }

  // VARIABLES 

  const { isDark, Todos, setTodos, setTodos2 } = useContext(Context)
  const [isChecked, setisChecked] = useState(false)
  let { todo } = props

  // CODE

  useEffect(() => {
    if (todo.completed) {
      setisChecked(true)
    }
  }, [])

  // RETURN

  return (
    <div className="TodoItem flex"
      style={{
        backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor,
        borderBottom: '1px solid #6b6d84',
        borderRadius: '0px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px'
      }}>
        <button className='Checkbox_container flex'
          onClick={handleClick}
          style={{
            background: isChecked ? 'linear-gradient(to bottom right, #60c8ff, #7d2dff)' : 'linear-gradient(to bottom right, transparent, transparent)',
            border: isChecked ? '' : '2px solid #60c8ff'
          }}
        >
          <i className="fa-solid fa-check Checkbox_container_i "
            style={{
              visibility: isChecked ? 'visible' : 'hidden'
            }}
          ></i>
        </button>
        <div className='flex'
          style={{
            color: isDark ? DarkTheme.textColor : LightTheme.textColor,
            paddingTop: '4px',
            textDecoration: isChecked ? 'line-through' : 'none'
          }}
        >{todo.desc}</div>
      </div>
      <i onClick={handleDelete} className="fa-solid fa-xmark" style={{ color: isDark ? 'white' : 'black', cursor: 'pointer' }}></i>

    </div>
  )
}
