import React from 'react';
import styles from './Input.module.scss';

const Input = ({ children, ...rest }) => {
	return (
		<div className={styles.container}>
			<input {...rest} />
			<div>{children}</div>
		</div>
	);
};

export default Input;
