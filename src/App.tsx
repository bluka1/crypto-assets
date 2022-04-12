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

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
		setLoading(false);
	});

	return (
		<div className="app">
			<div>
				<Toaster position="top-center" />
			</div>
			{loading && <Loading />}
			{!loading && isLoggedIn && (
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
			)}
			{!loading && !isLoggedIn && (
				<>
					<div className="appContent">
						<img className="logo" src="/images/logo.jpg" alt="logo" />
						<h1 className="logoText">Crypto Assets</h1>
					</div>
					<button className="signInButton" onClick={logIn}>
						<img
							className="signInWithGoogleIcon"
							src="/images/google.jpg"
							alt="google sign"
						/>
						Sign In with Google
					</button>
				</>
			)}
		</div>
	);
}

export default App;
