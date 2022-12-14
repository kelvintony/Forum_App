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
	baseURL: 'https://reddit-forum-api.vercel.app',
	// baseURL: 'http://localhost:5000',
	headers:{'Content-Type':'application/json'},
	withCredentials:true
});

const Signin = () => {
	//toggle menu section
	const [ mobileMenu, setmobileMenu ] = useState(false);

	const toggle = () => {
		setmobileMenu(!mobileMenu);
	};

	const router = useRouter();

	const { pathname, asPath } = router; 

	const {redirect}= router.query

	const [ user, setUser ] = useState(null);

	// const userDummy=globalThis?.window?.sessionStorage.getItem('profile')

	// console.log(userDummy)


	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const [ responseMessage, setResponseMessage ] = useState('');

	const [ errorMessage, setErrorMessage ] = useState('');

	const [ formDataError, setFormDataError ] = useState(false);

	const [ loading, setLoading ] = useState(false);

	const [ loadComponent, setLoadComponent ] = useState(true);

	useEffect(() => {
		setUser(JSON.parse(window.sessionStorage.getItem('profile')));
			setLoadComponent(false)
	}, [])

	console.log(loadComponent)

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

	// console.log(user)

	if (user!==null) {
		router.replace('/')
		return null
	}

	if (loadComponent) {
		return null
	}
	return (
		<div>
			<Navbar openMenu={toggle} />
			{mobileMenu&&<LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />}
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

export default Signin;
