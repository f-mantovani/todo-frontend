import { useEffect, useState } from 'react'
import { apiConnect } from '../utils/axios.js'

const TodoList = () => {
	const [todoList, setTodoList] = useState(null)
	const [newTodo, setNewTodo] = useState('')
	const [errorCreating, setErrorCreating] = useState('')

	const handleCreateTodo = (e) => {
		e.preventDefault()
		setErrorCreating('')

		apiConnect
			.createTodo({ title: newTodo })
			.then(() => {
				return getAllTodos()
			})
			.then(() => {
				setNewTodo('')
			})
			.catch((error) => setErrorCreating(error.response.data.message))
	}

	const handleCompleteTodo = (id, e) => {
		apiConnect
			.updateTodo(id, { completed: e.target.checked })
			.then((response) => {
				getAllTodos()
			})
			.catch((error) => console.log(error))
	}

	const handleDeleteTodo = (id) => {
		apiConnect
			.deleteTodo(id)
			.then(() => {
				getAllTodos()
			})
			.catch((error) => console.log(error))
	}

	const getAllTodos = () => {
		apiConnect
			.getAllTodos()
			.then((response) => {
				setTodoList(response.data)
			})
			.catch((error) => console.log(error))
	}
	useEffect(() => {
		getAllTodos()
	}, [])

	return (
		<>
			<form className='form' onSubmit={handleCreateTodo}>
				<div className='form-group'>
					<label htmlFor='todo-title'>Title: </label>
					<input
						id='todo-title'
						name='todo-title'
						type='text'
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
					/>
				</div>
				{errorCreating && (
					<p style={{ color: 'white', backgroundColor: 'orangered' }}>{errorCreating}</p>
				)}
				<button type='submit'>Create Todo </button>
			</form>
			{todoList === null && <p>Getting Todos!</p>}
			{todoList && todoList.length === 0 && <p> You don't have any to dos yet</p>}
			<div className='todo-list'>
				{todoList &&
					todoList.map((todo) => (
						<div key={todo._id} className='todo-item'>
							<input
								type='checkbox'
								id={todo._id}
								name={todo._id}
								defaultChecked={todo.completed}
								onChange={(e) => {
									handleCompleteTodo(todo._id, e)
								}}
							/>
							<label htmlFor={todo._id}>{todo.title}</label>

							<p
								style={{
									backgroundColor: 'red',
									padding: '.15rem .25rem',
									cursor: 'pointer',
									color: 'white',
									borderRadius: '4px',
									fontWeight: 600,
								}}
								onClick={() => handleDeleteTodo(todo._id)}
							>
								X
							</p>
						</div>
					))}
			</div>
		</>
	)
}
export default TodoList
