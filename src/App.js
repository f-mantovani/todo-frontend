import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import TodoList from './components/TodoList.jsx'
import IsPrivate from './components/IsPrivate.jsx'
import IsAnon from './components/IsAnon.jsx'

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={
						<IsPrivate>
							<TodoList />
						</IsPrivate>
					}
				/>
				<Route
					path='/signup'
					element={
						<IsAnon>
							<Signup />
						</IsAnon>
					}
				/>
				<Route
					path='/login'
					element={
						<IsAnon>
							<Login />
						</IsAnon>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
