import React from 'react';
import styles from './Form.module.scss';

const From = ({ title, children, onSubmit }) => {
	return (
		<form className={styles.container} onSubmit={onSubmit} method='POST'>
			<div className={styles.heading}>
				<h2>{title}</h2>
			</div>
			<div className={styles.content}>{children}</div>
		</form>
	);
};

export default From;
