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

	signup(body) {
		return this.api.post('/auth/signup', body)
	}

	login(body) {
		return this.api.post('/auth/login', body)
	}

	verify() {
		return this.api.get('/auth/verify')
	}
}

export const apiConnect = new Api()
