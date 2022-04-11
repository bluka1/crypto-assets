import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import toast from 'react-hot-toast';

const firebaseConfig = {
	apiKey: 'AIzaSyDAiFupiXHUVw4vxxJazuXweq5GgCIlbls',
	authDomain: 'crypto-assets-2516c.firebaseapp.com',
	databaseURL:
		'https://crypto-assets-2516c-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'crypto-assets-2516c',
	storageBucket: 'crypto-assets-2516c.appspot.com',
	messagingSenderId: '587465707232',
	appId: '1:587465707232:web:a49e215d823fca7994ca85',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);

export function writeUserName(userName: string, favorites: string[]) {
	set(ref(db, 'users/' + userName), {
		username: userName,
		favorites: favorites,
	});
}

export const logIn = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
			writeUserName(user.displayName!, [
				'bitcoin',
				'ethereum',
				'polkadot',
				'cardano',
				'solana',
			]);
			toast.success(
				`Welcome ${user.displayName}! Hope that you will enjoy using/testing this web app :)`,
				{
					duration: 3500,
					style: {
						border: '1px solid green',
						padding: '16px',
						color: '#7a89fe',
						textAlign: 'center',
					},
					iconTheme: {
						primary: '#7a89fe',
						secondary: '#e8edf3',
					},
				},
			);
		})
		.catch(({ message }) => {
			toast.error('Something went wrong. Sorry to see that :(' + message);
		});
};

export const logOut = () => {
	signOut(auth)
		.then(() => {
			toast.success('Sorry to see you go... but you successfully signed out.', {
				duration: 3000,
			});
		})
		.catch(({ message }) => {
			toast.error('Something went wrong. ' + message);
		});
};
