import React, { useContext, useRef } from 'react'
import light_image from '../assets/bg-desktop-light.jpg'
import dark_image from '../assets/bg-desktop-dark.jpg'
import { LightTheme, DarkTheme } from '../../Themes'
import TodoItem from './TodoItem'
import { Context } from '../GlobalContext'

export default function TodoContainer() {
	// FUNCTIONS
	function handleThemeChange() {
		isDark ? setisDark(false) : setisDark(true)
	}
	function addHoverClass(e) {
		e.target.classList.add(isDark ? 'hoverLight' : 'hoverDark')
	}
	function removeHoverClass(e) {
		e.target.classList.remove(isDark ? 'hoverLight' : 'hoverDark')
	}
	function handleActive(e) {
		let x = Array.from(FiltersRef.current.children)
		x.forEach(element => {
			if (element.classList.contains('active')) {
				element.classList.remove('active')
			}
		})
		e.target.classList.add('active')
		let choice = e.target.innerText
		switch (choice) {
			case 'All':
				filterAll()
				break
			case 'Active':
				filterActive()
				break
			case 'Completed':
				filterCompleted()
				break
		}
	}
	function handleAddTodo() {
		if (InputRef.current.value == '') {
			alert('Empty textfield')
		} else {
			let newID = Todos[Todos.length - 1].id + 1
			let newTodo = {
				id: newID,
				desc: InputRef.current.value,
				completed: false
			}
			setTodos([...Todos, newTodo])
			setTodos2([...Todos2, newTodo])
		}
	}
	function filterActive() {
		let NewArray = Todos2.filter(e => {
			if (!e.completed) {
				return e
			}
		})
		setTodos(NewArray)
	}
	function filterAll() {
		setTodos(Todos2)
	}
	function filterCompleted() {
		let NewArray = Todos2.filter(e => {
			if (e.completed) {
				return e
			}
		})
		setTodos(NewArray)
	}
	function handleClearCompleted() {
		let NewArray = Todos2.filter(e => {
			if (!e.completed) {
				return e
			}
		})
		setTodos(NewArray)
		setTodos2(NewArray)
	}

	// VARIABLES
	const { isDark, setisDark, Todos, setTodos, Todos2, setTodos2 } = useContext(Context)
	const FiltersRef = useRef(null)
	const InputRef = useRef(null)

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
					>TODO</div>
					<div onClick={handleThemeChange}>
						{
							isDark ? <i className='bx bxs-sun'></i> : <i className='bx bxs-moon'></i>
						}
					</div>
				</div>

				{/* ################ INPUT CONTAINER ################ */}

				<div className="inputContainer flex"
					style={{
						backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor
					}}
				>
					<input ref={InputRef} type="text" placeholder='Create a new todo...' style={{ color: isDark ? 'white' : 'black' }} required={true} />
					<button onClick={handleAddTodo}>Add</button>
				</div>

				<div className='Todo_Container'>

					{/* ################ TODO ITEMS CONTAINER ################ */}

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

					{/* ################ FILTERS CONTAINER ################ */}

					<div className="filtersContainer flex"
						style={{
							backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor,
							color: isDark ? DarkTheme.inactiveColor : LightTheme.inactiveColor
						}}
					>
						<div>{Todos.length} items left</div>
						<div ref={FiltersRef} className='Filters flex'>
							<div
								className='active'
								onMouseEnter={addHoverClass}
								onMouseLeave={removeHoverClass}
								onClick={handleActive}
							>All</div>
							<div
								onMouseEnter={addHoverClass}
								onMouseLeave={removeHoverClass}
								onClick={handleActive}
							>Active</div>
							<div
								onMouseEnter={addHoverClass}
								onMouseLeave={removeHoverClass}
								onClick={handleActive}
							>Completed</div>
						</div>
						<div style={{ cursor: 'pointer' }}
							onMouseEnter={addHoverClass}
							onMouseLeave={removeHoverClass}
							onClick={handleClearCompleted}
						>Clear Completed</div>
					</div>
				</div>

			</div>
		</div>
	)
}
