import { onAuthStateChanged } from 'firebase/auth';
import { child, get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

interface IAuthContext {
	username: string | null;
	favorites: string[];
}

const defaultState = {
	username: null,
	favorites: [],
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthContextProvider: React.FC = (props) => {
	const [user, setUser] = useState<{
		username: string | null;
		favorites: string[];
	}>(defaultState);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const dbRef = ref(db);
				get(child(dbRef, `users/${user.uid}`))
					.then((snapshot) => {
						if (snapshot.exists()) {
							setUser(snapshot.val());
						} else {
							console.log('No data available');
						}
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				setUser({
					username: '',
					favorites: [],
				});
			}
		});
	}, []);

	const contextValue: IAuthContext = {
		username: user?.username,
		favorites: user?.favorites,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
