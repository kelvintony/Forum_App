import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import profileImage from '../../assets/home-page/user-icon.svg';

import {MdNotificationsNone} from 'react-icons/md'
import {BiMessageRounded} from 'react-icons/bi'

import register_logo from '../../assets/user_plus.svg';
import menuIcon from '../../assets/home-page/menu-icon.svg';

const Navbar = (props) => {
	const [ showMenu, setshowMenu ] = useState(false);

	const toggle = () => {
		setshowMenu(!showMenu);
	};

	const router = useRouter();

	const { pathname } = router;
	const [ user, setUser ] = useState();

	useEffect(
		() => {
			setUser(JSON.parse(window.sessionStorage.getItem('profile')));
		},
		[ pathname ]
	);

	const logoutUser = async () => {
		await axios
			.get('http://localhost:5000/user//logout')
			.then((res) => {
				if (res) {
					console.log('logout success');
				}
			})
			.catch((err) => {});
		window.sessionStorage.clear();
		setUser(null);
		window.location = '/';
	};

	
	return (
		<nav className={styles.navbar_container}>
			<div className={styles.hamburger_container}>
				<button className={styles.hamburger_menu} onClick={() => props.openMenu()}>
					{' '}
					<Image src={menuIcon} width={30} height={30} alt='menu_icon' />
				</button>
				<Link href='/' className={styles.navbar_logo}>
					<p>Forum</p>
					<Image className={styles.logo_image} src={logo} alt='pix-a' />
				</Link>
			</div>

			<div className={styles.navbar_btn}>
				{user ? (
					<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
						{' '}
						{/* <h4 style={{ color: ' #04AA6D', fontSize: '12px' }}>{user?.result?.username}</h4>{' '} */}
						<Link href='/'>
							<MdNotificationsNone color='#808080' size={25}/>
						</Link>
						<Link href='/'>
							<BiMessageRounded color='#808080' size={25}/>
						</Link>
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
				{user&&
				<button onClick={toggle} className={styles.btn_profileImage}>
					{user?.result?.username.charAt(0).toUpperCase()}
					{/* <Image className={styles.profile_image} src={profileImage} alt='profile_pix' /> */}
				</button>}

				{user&&<div className={showMenu ? styles.profile_dropdown : styles.close_profileMenu}>
					<ul>
						<li>
							<h3 className={styles.profile_Name}>{user?user?.result?.username:'kel123'}</h3>
							<span className={styles.proile_userName}>@{user?user?.result?.username:'kel123'}</span>
						</li>
						<hr />
						<li onClick={toggle} className={styles.profileItems}>
							<Link href=''>Dashboard</Link>
						</li>
						<li onClick={toggle} className={styles.profileItems}>
							<Link href=''>Write a post</Link>
						</li>
						<li onClick={toggle} className={styles.profileItems}>
							<Link href=''>Settings</Link>
						</li>
						<hr />
						<li onClick={logoutUser} className={styles.profileItems}>
							<Link  href=''>Logout</Link>
						</li>
						{/* <li onClick={logoutUser} className={styles.btn_register}>
							<Link  href='/'>Logout</Link>
						</li> */}
					</ul>
				</div>}
			</div>
		</nav>
	);
};

export default Navbar;
