import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import loginPix from '../assets/login_pix.png';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';

const authAxios = axios.create({
	baseURL: 'http://localhost:5000'
});

const signin = () => {
	//toggle menu section
	const [ mobileMenu, setmobileMenu ] = useState(false);

	const toggle = () => {
		setmobileMenu(!mobileMenu);
	};

	// const router = useRouter();

	useEffect(() => {}, []);

	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	// const navigate = useNavigate();

	const submitFormData = async () => {
		await authAxios
			.post('/user/signin', formData)
			.then((res) => {
				if (res) {
					// localStorage.setItem('profile', JSON.stringify(res.data));
					alert('signin successfully');
					// navigate('/');
				}
			})
			.catch((error) => {
				alert('user already exist');
			});
	};

	return (
		<div>
			<Navbar openMenu={toggle} />
			<LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />

			<section className={styles.register_container}>
				<div className={styles.register_inner_container}>
					<div className={styles.container_a}>
						<h3>We&apos;ve Missed You</h3>
						<p className={styles.container_p}>
							Kindly signin and get first access to the very best topic and community.
						</p>

						<label htmlFor='email'>
							Email: <br />
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
							<br />
						</label>

						<label htmlFor='password'>
							Password: <br />
							<input
								type='password'
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							/>
							<br />
						</label>

						<button onClick={submitFormData} className={styles.btn_register_a}>
							Login
						</button>

						<Link href='/signup' className={styles.already_signup}>
							Forget username or password?
						</Link>

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
