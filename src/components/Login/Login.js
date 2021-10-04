import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

import classes from './Login.module.css';

const ACTIONS = {
	EMAIL_CHANGE: 'email_change',
	INPUT_BLUR: 'input_blur',
	PASSWORD_CHANGE: 'password_change',
}

const emailReducer = (state, action) => {
	switch(action.type) {
		case ACTIONS.EMAIL_CHANGE:
			return { value: action.payload.val, isValid: action.payload.val.includes('@') };
		case ACTIONS.INPUT_BLUR:
			return { value: state.value, isValid: state.value.includes('@')}
		default:
			return { value: '', isValid: false };
	}
}

const passwordReducer = (state, action) => {
	switch(action.type) {
		case ACTIONS.PASSWORD_CHANGE:
			return { value: action.payload.val, isValid: action.payload.val.trim().length > 6 };
		case ACTIONS.INPUT_BLUR:
			return { value: state.value, isValid: state.value.trim().length > 6}
		default:
			return { value: '', isValid: false };
	}
}

const Login = () => {
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
	const [passwordState, dispatchPassword] = useReducer(	passwordReducer, {value: '', isValid: null});

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(()=> {
		const identifier = setTimeout(() => {
			console.log('Checking Form Validation!');
			setFormIsValid(
				emailIsValid && passwordIsValid
			);
		}, 500);

		return () => {
			console.log('CLEAN UP ');
			clearTimeout(identifier);
		};

	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: ACTIONS.EMAIL_CHANGE, payload: {val: event.target.value} });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: ACTIONS.PASSWORD_CHANGE, payload: {val: event.target.value} });
	};

	const validateEmailHandler = () => {
		dispatchEmail({type: ACTIONS.INPUT_BLUR});
	};

	const validatePasswordHandler = () => {
		dispatchPassword({type: ACTIONS.INPUT_BLUR});
	};
	
	const authCtx = useContext(AuthContext);

	const submitHandler = (event) => {
			event.preventDefault();
			authCtx.onLogin(emailState.value, passwordState.value);
	};


	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div 
					className={`${classes.control} ${ 
						emailState.isValid === false ? classes.invalid : '' 
					}`}>
					<label htmlFor="email">Email</label>
					<input 
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div className={`${classes.control} ${
					passwordState.isValid === false ? classes.invalid : ''
				}`}>
					<label htmlFor="password">Password</label>
					<input 
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button 
						type="submit" className={classes.btn}
						disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form> 
		</Card>
	)
}

export default Login;