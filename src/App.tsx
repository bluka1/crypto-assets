import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { logIn } from './firebase';

import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login';
import UnProtectedRoute from './components/UnProtectedRoute/UnProtectedRoute';
import CryptoCurrency from './pages/CryptoCurrency';
import AuthContext from './context/auth-context';

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<div className="app">
			<div>
				<Toaster position="top-center" />
			</div>
			<Routes>
				<Route
					path="/login"
					element={
						<UnProtectedRoute>
							<Login login={logIn} />
						</UnProtectedRoute>
					}
				/>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/c/:currencyId"
					element={
						<ProtectedRoute>
							<CryptoCurrency />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/market"
					element={
						<ProtectedRoute>
							<Market />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/favorites"
					element={
						<ProtectedRoute>
							<Favorites />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/settings"
					element={
						<ProtectedRoute>
							<Settings />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
