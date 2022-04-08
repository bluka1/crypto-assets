import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

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

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// AUTH
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// REALTIME DB
export const db = getDatabase(app);

// WRITE USERNAME TO DB
export function writeUserName(userName: string, favorites: string[]) {
	set(ref(db, 'users/' + userName), {
		username: userName,
		favorites: favorites,
	});
}
