import React, { useContext, useRef } from 'react'
import light_image from '../assets/bg-desktop-light.jpg'
import light_image_mob from '../assets/bg-mobile-light.jpg'
import dark_image from '../assets/bg-desktop-dark.jpg'
import dark_image_mob from '../assets/bg-mobile-dark.jpg'
import { LightTheme, DarkTheme } from '../../Themes'
import { Context } from '../GlobalContext'
import useFirebase from '../../customHooks/useFirebase'
import TodoItemsContainer from './TodoItemsContainer'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'

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

	async function handleAddTodo() {
		if (!isLoggedIn) {
			alert("You need to Login first!")
			navigate('/login')
			return
		}
		if (InputRef.current.value == '') {
			alert('Empty textfield')
		} else {
			setLoader(true)
			let docID = await insert_todo(InputRef.current.value)
			setLoader(false)
			let newTodo = {
				id: docID,
				desc: InputRef.current.value,
				completed: false
			}
			setTodos([newTodo, ...Todos])
			setTodos2([newTodo, ...Todos2])
			InputRef.current.value = ''
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
		let NewArray = Todos2.filter(async (e) => {
			if (!e.completed) {
				return e
			} else {
				setLoader(true)
				await DeleteTodo(e.id)
				setLoader(false)
			}
		})
		setTodos(NewArray)
		setTodos2(NewArray)
	}

	// VARIABLES

	const { isDark, setisDark, Todos, setTodos, Todos2, setTodos2, Loader, setLoader, isLoggedIn } = useContext(Context)
	const FiltersRef = useRef(null)
	const InputRef = useRef(null)
	const navigate = useNavigate()
	const { insert_todo, DeleteTodo } = useFirebase()
	let windowSize = window.innerWidth

	// CODE

	// RETURN
	return (
		<div className='MainContainer flex'
			style={{
				backgroundColor: isDark ? DarkTheme.MaincontainerColor : LightTheme.MaincontainerColor,
				userSelect: 'none'
			}}
		>
			{
				windowSize <= 1024 ?
					<img src={isDark ? dark_image_mob : light_image_mob} alt="" />
					:
					<img src={isDark ? dark_image : light_image} alt="" />
			}

			{Loader ? <Spinner /> : ''}
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

					{
						Todos.length == 0 ?
							<div className="TodoItemsContainer flex"
								style={{
									backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor,
									justifyContent: 'center',
									color: isDark ? DarkTheme.textColor : LightTheme.textColor
								}}
							>
								<div >No Todos available</div>
							</div>
							:
							<TodoItemsContainer Todos={Todos} />
					}

					{/* ################ FILTERS CONTAINER ################ */}

					<div className="filtersContainer flex"
						style={{
							backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor,
							color: isDark ? DarkTheme.inactiveColor : LightTheme.inactiveColor
						}}
					>
						<div>{Todos.length} items left</div>
						{
							windowSize > 480 ?
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
								</div> : ''
						}
						<div style={{ cursor: 'pointer' }}
							onMouseEnter={addHoverClass}
							onMouseLeave={removeHoverClass}
							onClick={handleClearCompleted}
						>Clear Completed</div>
					</div>
				</div>
				{
					windowSize <= 481 ?
						<div ref={FiltersRef} className='Filters flex'
							style={{
								backgroundColor: isDark ? DarkTheme.TodoContainerColor : LightTheme.TodoContainerColor,
								color: isDark ? DarkTheme.inactiveColor : LightTheme.inactiveColor,
								width: '100%',
								justifyContent: 'center',
								padding: '15px',
								borderRadius: '10px'
							}}
						>
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
						</div> : ''
				}
			</div>
		</div>
	)
}
