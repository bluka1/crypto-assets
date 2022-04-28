import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref, set } from 'firebase/database';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
} from 'firebase/auth';
import toast from 'react-hot-toast';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
	messagingSenderId: process.env.REACT_APP_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);

export function writeUserName(
	userName: string,
	favorites: string[],
	userId: string,
) {
	set(ref(db, 'users/' + userId), {
		username: userName,
		favorites: favorites,
	});
}

const checkIfExists = (username: string, userId: string) => {
	const dbRef = ref(db);
	get(child(dbRef, `users/${userId}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				toast.success(
					`Welcome ${username}! Hope that you will enjoy using/testing this web app :)`,
					{
						duration: 3500,
						style: {
							border: '1px solid green',
							padding: '16px',
							textAlign: 'center',
						},
					},
				);
			} else {
				writeUserName(
					username,
					['bitcoin', 'ethereum', 'polkadot', 'cardano', 'solana'],
					userId,
				);
			}
		})
		.catch((error) => {
			console.error(error);
		});
};

export const logIn = () => {
	return signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
			checkIfExists(user.displayName!, user.uid);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
			toast.error('Something went wrong. Sorry to see that :(' + errorMessage);
		});
};

export const logOut = () => {
	return signOut(auth)
		.then(() => {
			toast.success('Sorry to see you go... but you successfully signed out.', {
				duration: 3000,
			});
		})
		.catch((error) => {
			toast.error('Something went wrong. ' + error.message);
		});
};
