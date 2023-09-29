import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiConnect } from '../utils/axios.js'

const Signup = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		const newUser = { email, password }

		apiConnect
			.signup(newUser)
			.then((response) => {
				setMessage(`${response.data.message}, redirecting to login in 3s`)
				setTimeout(() => {
					navigate('/login')
				}, 3000)
			})
			.catch((error) => {
				setMessage(error.response.data.message)
			})
	}

	return (
		<form className='form' onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='email'>Email: </label>
				<input
					id='email'
					name='email'
					placeholder='rockstar@ironhack.com'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='password'>Password: </label>
				<input
					id='password'
					name='password'
					placeholder='**********'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{message && <p>{message}</p>}
			<button type='submit'>Register</button>
		</form>
	)
}
export default Signup
