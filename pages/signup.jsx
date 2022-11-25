import React from 'react';
import Link from 'next/link';
import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import registerPix from '../assets/register_pix.png';
import Navbar from '../components/Navbar/Navbar';

const signup = () => {
	return (
		<div>
			<Navbar />
			<section className={styles.register_container}>
				<div className={styles.register_inner_container}>
					<div className={styles.container_a}>
						<h3>
							Join The <br /> Community
						</h3>
						<p className={styles.container_p}>
							Create your Member profile and get first access to the very best topic and community.
						</p>

						<label htmlFor='username'>
							Username: <br />
							<input type='text' name='' id='' />
							<br />
						</label>

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

						<label htmlFor='confirmPassword'>
							Confirm Password: <br />
							<input type='password' name='' id='' />
							<br />
						</label>

						<button className={styles.btn_register_a}>Register</button>
						<Link href='/signin' className={styles.already_signup}>
							Already have an account? <span>Sign in</span>
						</Link>
					</div>
					<div className={styles.container_b}>
						<Image className={styles.regster_logo} src={registerPix} alt='pix-c' />
					</div>
				</div>
			</section>
		</div>
	);
};

export default signup;
