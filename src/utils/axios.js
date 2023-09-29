import axios from 'axios'

class Api {
	constructor() {
		this.api = axios.create({
			baseURL: process.env.REACT_APP_API_URL,
		})

		this.api.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('token')
				if (token) {
					config.headers = {
						Authorization: `Bearer ${token}`,
					}
				}
				return config
			},
			(error) => {
				console.log(error)
			}
		)
	}
	// ============ Auth Routes ===============
	signup(body) {
		return this.api.post('/auth/signup', body)
	}

	login(body) {
		return this.api.post('/auth/login', body)
	}

	verify() {
		return this.api.get('/auth/verify')
	}

	// ============ To do Routes ===============
	getAllTodos() {
		return this.api.get('/todo')
	}

	createTodo(newTodoText) {
		return this.api.post('/todo', newTodoText)
	}

	updateTodo(id, updateData) {
		return this.api.put(`/todo/${id}`, updateData)
	}

	deleteTodo(id) {
		return this.api.delete(`/todo/${id}`)
	}
}

export const apiConnect = new Api()
