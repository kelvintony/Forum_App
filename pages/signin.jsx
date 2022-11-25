import React from 'react';
import Link from 'next/link';
import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import loginPix from '../assets/login_pix.png';
import Navbar from '../components/Navbar/Navbar';

const signin = () => {
	return (
		<div>
			<Navbar />
			<section className={styles.register_container}>
				<div className={styles.register_inner_container}>
					<div className={styles.container_a}>
						<h3>We&apos;ve Missed You</h3>
						<p>Kindly signin and get first access to the very best topic and community.</p>

						<label htmlFor='email'>
							Email: <br />
							<input type='email' name='' id='' />
							<br />
						</label>

						<label htmlFor='password'>
							Password: <br />
							<input type='password' name='' id='' />
							<br />
						</label>

						<button className={styles.btn_register_a}>Login</button>
						<Link href='/signup' className={styles.already_signup}>
							Don&apos;t have an account? <span>Sign up</span>
						</Link>
					</div>
					<div className={styles.container_b}>
						<Image className={styles.regster_logo} src={loginPix} alt='pix-c' />
					</div>
				</div>
			</section>
		</div>
	);
};

export default signin;
