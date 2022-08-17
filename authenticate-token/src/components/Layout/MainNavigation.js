import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const authCtx = useContext(AuthContext);

	const userLoggedIn = authCtx.isLoggedIn;
	return (
		<header className={classes.header}>
			<Link to='/'>
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!userLoggedIn && (
						<li>
							<Link to='/auth'>Login</Link>
						</li>
					)}
					{userLoggedIn && (
						<li>
							<Link to='/profile'>Profile</Link>
						</li>
					)}
					{userLoggedIn && (
						<li>
							<button>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
