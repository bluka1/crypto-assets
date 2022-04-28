import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const authCtx = useContext(AuthContext);
	if (!Boolean(authCtx.username)) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default ProtectedRoute;
