import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import registerPix from '../assets/register_pix.png';
import Navbar from '../components/Navbar/Navbar';

const authAxios = axios.create({
	baseURL: 'http://localhost:5000'
});

const signup = () => {
	// const router = useRouter();

	useEffect(() => {}, []);

	const [ formData, setFormData ] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	// const navigate = useNavigate();

	const submitFormData = async () => {
		await authAxios
			.post('/user/signup', formData)
			.then((res) => {
				if (res) {
					// localStorage.setItem('profile', JSON.stringify(res.data));
					alert('signup successfully');
					// navigate('/');
				}
			})
			.catch((error) => {
				alert('Email already exist');
			});

		console.log(formData);
	};

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
							<input
								type='text'
								name='username'
								value={formData.username}
								onChange={(e) => setFormData({ ...formData, username: e.target.value })}
							/>
							<br />
						</label>

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

						<label htmlFor='confirmPassword'>
							Confirm Password: <br />
							<input
								type='password'
								value={formData.confirmPassword}
								onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
							/>
							<br />
						</label>

						<button onClick={submitFormData} className={styles.btn_register_a}>
							Register
						</button>
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
