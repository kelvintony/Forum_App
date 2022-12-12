import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';
import MainSection from '../sections/home/MainSection';

export default function Home({ cookies }) {
	console.log('');
	return (
		<div>
			<Navbar />
			<LeftSideBar />
			<section className={styles.rigtbar_section}>
				<MainSection />
			</section>
		</div>
	);
}
