import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

import { auth, provider, writeUserName } from './firebase';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Settings from './pages/Settings';
import Favorites from './pages/Favorites';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	});

	const logIn = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				toast.success('You successfully signed in.');
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
				toast.error('Something went wrong. ' + errorMessage);
			});
	};

	const logOut = () => {
		signOut(auth)
			.then(() => {
				toast.success('You successfully signed out.');
			})
			.catch((error) => {
				toast.error('Something went wrong. ' + error.message);
			});
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-stone-50 font-body'>
			<div>
				<Toaster position='top-center' />
			</div>
			{isLoading && <img src='/images/loading.gif' alt='loading' />}
			{!isLoading && isLoggedIn && (
				<>
					<Routes>
						<Route path='/' element={<Home onLogout={logOut} />}>
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='market' element={<Market />} />
							<Route path='favorites' element={<Favorites />} />
							<Route path='settings' element={<Settings />} />
						</Route>
					</Routes>
				</>
			)}
			{!isLoading && !isLoggedIn && (
				<>
					<div className='flex justify-center items-center p-[20px] lg:p-[38px] border-b-2 border-grayPrimary font-semibold'>
						<img
							className='mr-[32px] rounded-full'
							src='/images/logo.jpg'
							alt='logo'
						/>
						<h1 className='text-[40px] lg:text-[64px]'>Crypto Assets</h1>
					</div>
					<button
						className='flex justify-center items-center mt-[42px] px-14 py-2 rounded-lg border-2 border-grayPrimary'
						onClick={logIn}
					>
						<img
							className='mr-[10px]'
							src='/images/google.jpg'
							alt='google sign'
						/>
						Sign In with Google
					</button>
				</>
			)}
		</div>
	);
}

export default App;
