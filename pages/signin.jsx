import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import loginPix from '../assets/login_pix.png';
import Navbar from '../components/Navbar/Navbar';


const authAxios = axios.create({
	baseURL: 'https://forum-api-3fif.onrender.com'
});

const signin = () => {
	const router = useRouter();

	// const navigate = useNavigate();

	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const [ responseMessage, setResponseMessage ] = useState('');

	const [ errorMessage, setErrorMessage ] = useState('');

	const [ formDataError, setFormDataError ] = useState(false);

	const [ loading, setLoading ] = useState(false);

	useEffect(() => {}, []);

	const submitFormData = async () => {
		if (
			formData.email.length === 0 ||
			formData.password.length === 0 
		) {
			setFormDataError(true);
		}

		if (formData.email && formData.password ) {
			setLoading(true);
		await authAxios
			.post('/user/signin', formData)
			.then((res) => {
				if (res) {
					window.sessionStorage.setItem('profile', JSON.stringify(res.data));
					setLoading(false);
					alert('signin successfully');
					router.push('/')

					// navigate('/');
				}
			})
			.catch((err) => {
				// alert('user already exist');
				setLoading(false);
				setErrorMessage(err?.response?.data?.message);
			});
		}
	};

	return (
		<div>
			<Navbar />
			<section className={styles.register_container}>
				<div className={styles.register_inner_container}>
					<div className={styles.container_a}>
						<h3>We&apos;ve Missed You</h3>
						<p className={styles.container_p}>
							Kindly signin and get first access to the very best topic and community.
						</p>
						{errorMessage && <p className={styles.errorMessageContainer}>{errorMessage}</p>}
						<label htmlFor='email'>
							Email: <br />
							<input
								type='email'
								name='email'
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
							<br />
							{formDataError && formData.email.length <= 0 ? (
									<span style={{ color: 'red' }}>* required</span>
								) : (
									''
								)}
						</label>

						<label htmlFor='password'>
							Password: <br />
							<input
								type='password'
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							/>
							<br />
							{formDataError && formData.password.length <= 0 ? (
									<span style={{ color: 'red' }}>* required</span>
								) : (
									''
								)}
						</label>

						<button onClick={submitFormData} className={styles.btn_register_a}   disabled={loading}>
						{loading ? 'loading...' : 'Login'}
						</button>

						<Link href='/signup' className={styles.already_signup}>
							Forgot username or password?
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
