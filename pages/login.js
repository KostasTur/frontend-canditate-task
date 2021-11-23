/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import useEmailValid from '../hooks/useEmailValid';
import styles from '../styles/Login.module.scss';
import Form from '../components/form/Form';
import Input from '../components/input/Input';
import Button from '../components/button/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
	loginUser,
	userSelector,
	clearState,
} from '../features/user/userSlice';
import UserIcon from '../components/icons/UserIcon';
import LockIcon from '../components/icons/LockIcon';

const LoginPage = () => {
	// local state
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const router = useRouter();

	const dispatch = useDispatch();
	const {
		email: userEmail,
		isFetching,
		isSuccess,
		isError,
		errorMessage,
	} = useSelector(userSelector);
	const validateEmail = useEmailValid;

	// login from local storage
	useEffect(() => {
		const userCredentials = JSON.parse(localStorage.getItem('user'));
		if (userCredentials) dispatch(loginUser(userCredentials));
	}, [dispatch]);

	// promise state handling
	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
			dispatch(clearState());
		}

		if (isSuccess) {
			dispatch(clearState());
			router.push('/');
		}
	}, [dispatch, router, userEmail, errorMessage, isError, isSuccess]);

	const handleEmailValidation = () => {
		if (!email) {
			toast.error('Please enter an email.');
			return true;
		}
		const emailNotValid = validateEmail(email);
		if (emailNotValid) {
			toast.error('Please enter a valid email.');
			return true;
		}
		return false;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		let error = false;
		if (!password) {
			toast.error('Please enter a password.');
			error = true;
		}
		const emailValfailed = handleEmailValidation();
		if (error || emailValfailed) return;
		dispatch(loginUser({ email: email, password: password }));
	};
	return (
		<div className={styles.wrapper}>
			<Form title={'Login Form'} onSubmit={(e) => handleSubmit(e)}>
				<Input
					placeholder={'Username'}
					type='text'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onBlur={handleEmailValidation}
				>
					<UserIcon />
				</Input>
				<Input
					placeholder={'Password'}
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onFocus={() => setPassword('')}
				>
					<LockIcon />
				</Input>
				<Button text={'Sign In'} disabled={isFetching} />
			</Form>
			<ToastContainer />
		</div>
	);
};

export default LoginPage;
