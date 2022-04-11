import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import { auth, logIn } from './firebase';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import Loading from './components/Loading/Loading';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const loginHandler = () => {
		setLoading(true);
		logIn();
		setLoading(false);
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
		setLoading(false);
	});

	let content;

	if (loading) {
		content = <Loading />;
	}

	if (!loading && isLoggedIn) {
		content = (
			<>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="market" element={<Market />} />
						<Route path="favorites" element={<Favorites />} />
						<Route path="settings" element={<Settings />} />
					</Route>
				</Routes>
			</>
		);
	}

	if (!loading && !isLoggedIn) {
		content = (
			<>
				<div className="appContent">
					<img className="logo" src="/images/logo.jpg" alt="logo" />
					<h1 className="logoText">Crypto Assets</h1>
				</div>
				<button className="signInButton" onClick={loginHandler}>
					<img
						className="signInWithGoogleIcon"
						src="/images/google.jpg"
						alt="google sign"
					/>
					Sign In with Google
				</button>
			</>
		);
	}

	return (
		<div className="app">
			<div>
				<Toaster position="top-center" />
			</div>
			{content}
		</div>
	);
}

export default App;
