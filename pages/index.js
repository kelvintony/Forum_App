import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';
import comingsoon from '../assets/comingsoon.png';




export default function Home({cookies}) {
	return (
		<div>
			<Navbar />
			<div className={styles.home_container}>
				<h1>Home</h1>
				{cookies?.access_token && <p>cookie is present live</p>}
				<Image className={styles.home_image} src={comingsoon} alt='pix-a' />
			</div>
		</div>
	);
}


