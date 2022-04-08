import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = (props: any) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/dashboard');
		}
	}, [navigate, location]);

	return (
		<div className='h-screen w-screen bg-stone-50 flex border-2 border-grayPrimary'>
			{/* LEFT SIDE */}
			<Navbar />

			{/* RIGHT SIDE */}
			<Outlet />
		</div>
	);
};

export default Home;
