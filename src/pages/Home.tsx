import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/dashboard');
			setLoading(false);
		}
	}, [navigate, location]);

	return (
		<div className="home">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default Home;
