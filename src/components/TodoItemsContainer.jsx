import React, { useContext } from 'react'
import { Context } from '../GlobalContext'
import { DarkTheme, LightTheme } from '../../Themes'
import TodoItem from './TodoItem'

export default function TodoItemsContainer(props) {
  // VARIABLES
  const { isDark } = useContext(Context)
  const { Todos } = props
  // RETURN
  return (
    <div className="TodoItemsContainer"
      style={{
        backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor
      }}
    >
      {
        Todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />
        })
      }
    </div>
  )
}
