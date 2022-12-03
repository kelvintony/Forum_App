import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import register_logo from '../../assets/user_plus.svg';

const Navbar = () => {
	// console.log('lol')
	const router = useRouter();

	const { pathname } = router;
	const [ user, setUser ] = useState();

	// const user = null;
	useEffect(
		() => {
			setUser(JSON.parse(window.sessionStorage.getItem('profile')));
		},
		[ pathname ]
	);

	const logoutUser = async () => {
		await axios
			.get('https://forum-api-3fif.onrender.com/logout')
			.then((res) => {
				if (res) {
					console.log('logout success');
					// navigate('/');
				}
			})
			.catch((err) => {});
		window.sessionStorage.clear();
		setUser(null);
		window.location = '/';
	};
	return (
		<nav className={styles.navbar_container}>
			<Link href='/' className={styles.navbar_logo}>
				<p>Forum</p>
				<Image className={styles.logo_image} src={logo} alt='pix-a' />
			</Link>

			<div className={styles.navbar_btn}>
				{user ? (
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						{' '}
						<h4 style={{ color: ' #04AA6D', fontSize: '12px' }}>{user.result.username}</h4>{' '}
						<button onClick={logoutUser} className={styles.btn_register}>
							Logout
						</button>
					</div>
				) : (
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						<Link href='/signup' className={styles.btn_register}>
							<Image className={styles.user_image} src={register_logo} alt='pix-b' /> Register
						</Link>
						<Link href='/signin' className={styles.btn_login}>
							Login
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
