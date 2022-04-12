import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import { auth, db, logIn } from './firebase';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import Loading from './components/Loading/Loading';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AuthContext from './store/auth-context';
import { child, get, ref } from 'firebase/database';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const authCtx = useContext(AuthContext);

	const navigate = useNavigate();

	const readUser = (username: string | null) => {
		const dbRef = ref(db);
		const user = get(child(dbRef, `users/${username}`))
			.then((user) => {
				if (user.exists()) {
					authCtx.nameHandler(user.val().username);
					authCtx.favoritesHandler(user.val().favorites);
				} else {
					return null;
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const loginHandler = () => {
		setLoading(true);
		logIn();
		navigate('/');
		setLoading(false);
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			readUser(user.displayName);
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
						<Route
							path="dashboard"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="market"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Market />
								</ProtectedRoute>
							}
						/>
						<Route
							path="favorites"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Favorites />
								</ProtectedRoute>
							}
						/>
						<Route
							path="settings"
							element={
								<ProtectedRoute user={isLoggedIn}>
									<Settings />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Routes>
			</>
		);
	}

	if (!loading && !isLoggedIn) {
		content = (
			<Routes>
				<Route
					path="/login"
					element={
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
					}
				></Route>
			</Routes>
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
