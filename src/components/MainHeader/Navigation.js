import React from 'react';

import classes from './Navigation.module.css';

const Navigation = (props) => {
	return (
		<nav className={classes.nav}>
			<ul>
				<li>
					<a href="/">Admin</a>
				</li>
				<li>
					<button href="/">Logout</button>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;