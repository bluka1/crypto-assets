import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

const UnProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const authCtx = useContext(AuthContext);
	if (!!authCtx.username) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export default UnProtectedRoute;
