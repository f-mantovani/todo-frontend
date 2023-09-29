import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth.context.js'

const IsAnon = ({ children }) => {
	const { user, isLoading } = useAuthContext()

	if (isLoading) {
		return <h3>Loading...</h3>
	} else {
		return !user ? children : <Navigate to={'/'} />
	}
}
export default IsAnon
