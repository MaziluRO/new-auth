import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const authCtx = useContext(AuthContext);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		setIsLoading(true);
		let url;
		if (isLogin) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBl0EMqBfFCSJXnycDuANplAjhb52-adjk';
		} else {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBl0EMqBfFCSJXnycDuANplAjhb52-adjk';
		}
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: true,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => {
				setIsLoading(false);
				console.log(res);
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((data) => {
						//show error modal
						console.log(data);
						let errorMessage = 'Authentication failed!';
						let lowerMsg = data.error.message.toLowerCase();
						const emailReg = /email/.test(lowerMsg);
						const passwordReg = /password/.test(lowerMsg);
						// console.log(emailReg);
						// console.log(passwordReg);
						if (data && data.error && data.error.message) {
							if (emailReg) {
								errorMessage = 'Invalid email. Please enter a valid email.';
							} else if (passwordReg) {
								errorMessage =
									'Invalid password. Password must be at least 6 characters long.';
							}
						}
						// console.log(errorMessage);
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				console.log(data);
				authCtx.login(data.idToken);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && <p>Loading...</p>}
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
