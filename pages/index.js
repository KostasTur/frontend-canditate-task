import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import buttonStyles from '../components/button/Button.module.scss';
import { useSelector } from 'react-redux';
import { userSelector } from '../features/user/userSlice';

export default function Home() {
	const { email } = useSelector(userSelector);
	return (
		<div>
			<Head>
				<title>Kostas-Task</title>
				<meta name='description' content='created with ❤️ by Kostas' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.home}>
				{email ? (
					<p>{`Hello, ${email}!`}</p>
				) : (
					<Link href='/login'>
						<a className={buttonStyles.primary}>Log In</a>
					</Link>
				)}
			</div>
		</div>
	);
}
