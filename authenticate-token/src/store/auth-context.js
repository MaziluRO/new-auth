import { useState, createContext } from 'react';

const AuthContext = createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);

	const userIsLoggedIn = !!token; //if token is not an empty string, it will return true, else it's false
	const logInHandler = (token) => {
		setToken(token);
	};

	const logOutHandler = () => {
		setToken(null);
	};

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: logInHandler,
		logout: logOutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
