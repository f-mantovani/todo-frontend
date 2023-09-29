import { createContext, useContext, useEffect, useState } from 'react'
import { apiConnect } from '../utils/axios.js'

const AuthContext = createContext(null)

function AuthProviderWrapper({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState(null)

	const storeToken = (token) => {
		localStorage.setItem('token', token)
	}

	const authenticateUser = () => {
		const storedToken = localStorage.getItem('token')

		if (!storedToken) {
			setIsLoggedIn(false)
			setIsLoading(false)
			setUser(null)
		}

		apiConnect
			.verify()
			.then((response) => {
				setIsLoading(false)
				setIsLoggedIn(true)
				setUser(response.data)
			})
			.catch(() => {
				setIsLoading(false)
				setIsLoggedIn(false)
				setUser(null)
			})
	}

	const removeToken = () => {
		localStorage.removeItem('token')
	}

	const logout = () => {
		removeToken()
		authenticateUser()
	}

	useEffect(() => {
		authenticateUser()
	}, [])

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, isLoading, user, logout, storeToken, authenticateUser, removeToken }}
		>
			{children}
		</AuthContext.Provider>
	)
}

function useAuthContext() {
	return useContext(AuthContext)
}

export { AuthProviderWrapper, useAuthContext }
