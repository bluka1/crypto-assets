import React, { useState } from 'react';

interface IAuthContext {
	name: string;
	favorites: string[];
	nameHandler: (name: string) => void;
	favoritesHandler: (favorites: string) => void;
}

const defaultState = {
	name: '',
	favorites: [''],
	nameHandler: (name: string) => {},
	favoritesHandler: (favorites: string | string[]) => {},
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

export const AuthContextProvider: React.FC = (props) => {
	const [name, setName] = useState('');
	const [favorites, setFavorites] = useState(['']);

	const nameHandler = (name: string) => {
		setName(name);
	};

	const favoritesHandler = (favorites: string | string[]) => {
		if (typeof favorites === 'string') {
			setFavorites((prevState) => [...prevState, favorites]);
		}
		if (typeof favorites === 'object') {
			setFavorites((prevState) => [...prevState, ...favorites]);
		}
	};

	const contextValue: IAuthContext = {
		name: name,
		favorites: favorites,
		nameHandler,
		favoritesHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
