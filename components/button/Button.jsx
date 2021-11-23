import React from 'react';
import style from './Button.module.scss';

const Button = ({ text, ...rest }) => {
	return (
		<button className={style.primary} {...rest}>
			{text}
		</button>
	);
};

export default Button;
