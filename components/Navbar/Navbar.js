import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import register_logo from '../../assets/user_plus.svg';

const Navbar = () => {
	return (
		<nav className={styles.navbar_container}>
			<Link href='/' className={styles.navbar_logo}>
				<p>Forum</p>
				<Image className={styles.logo_image} src={logo} alt='pix-a' />
			</Link>

			<div className={styles.navbar_btn}>
				<Link href='/signup' className={styles.btn_register}>
					<Image className={styles.user_image} src={register_logo} alt='pix-b' /> Register
				</Link>
				<Link href='/signin' className={styles.btn_login}>
					Login
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
