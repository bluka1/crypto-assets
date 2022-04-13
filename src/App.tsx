import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import { auth, logIn } from './firebase';

import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import Loading from './components/Loading/Loading';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './components/Login/Login';
import UnProtectedRoute from './components/UnProtectedRoute/UnProtectedRoute';

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
			{!loading && (
				<>
					<Routes>
						<Route
							path="/login"
							element={
								<UnProtectedRoute user={isLoggedIn}>
									<Login login={logIn} />
								</UnProtectedRoute>
							}
						/>
						<Route
							path="/"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Dashboard user={isLoggedIn} />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/market"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Market />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/favorites"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Favorites />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/settings"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Settings />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
