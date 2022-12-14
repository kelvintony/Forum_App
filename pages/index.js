import React, { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';
import MainSection from '../sections/home/MainSection';
import RightSideBar from '../sections/home/RightSideBar';

export default function Home() {
	const [ mobileMenu, setmobileMenu ] = useState(false);

	const toggle = () => {
		setmobileMenu(!mobileMenu);
	};

	return (
		<div>
			<Navbar openMenu={toggle} />
			<LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />
			<section className={styles.rigtbar_section}>
				<MainSection />
				<RightSideBar />
			</section>
		</div>
	);
}
