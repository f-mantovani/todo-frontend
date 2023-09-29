import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/auth.context.js'

const Navbar = () => {
	const { isLoggedIn, logout } = useAuthContext()
	return (
		<nav>
			<div>
				<Link to={'/'}>
					<h2>Todo</h2>
				</Link>
			</div>
			<div className='menu-items'>
				{!isLoggedIn ? (
					<>
						<Link to={'/login'}>Login</Link>
						<Link to={'/signup'}>Signup</Link>
					</>
				) : (
					<button onClick={logout}>Logout</button>
				)}
				<Link to={''}>My Todo List</Link>
			</div>
		</nav>
	)
}
export default Navbar
