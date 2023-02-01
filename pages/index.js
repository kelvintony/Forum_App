import React, { useState, useEffect } from 'react';

import db from '../utils/db';
import postModel from '../models/post';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';
import MainSection from '../sections/home/MainSection';
import RightSideBar from '../sections/home/RightSideBar';

import { signIn, getSession } from 'next-auth/react';
import axios from 'axios';

export default function Home({ session,data }) {
	const [ mobileMenu, setmobileMenu ] = useState(false);

	const toggle = () => {
		setmobileMenu(!mobileMenu);
	};

	useEffect(() => {
		window.localStorage.setItem('profile', session?JSON.stringify(session?.user):'');
	}, []);

	// console.log('from home page', session);

	return (
		<div>
			<Navbar openMenu={toggle} session={session} />
			<LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />
			<section className={styles.rigtbar_section}>
				<MainSection data={data} />
				<RightSideBar />
			</section>
		</div>
	);
}
export async function getServerSideProps(context) {
	const session = await getSession(context);

	await db.connect();
	const posts = await postModel.find({}).populate('user', 'username');

	await db.disconnect();
	let serPost = JSON.parse(JSON.stringify(posts))
	// await db.disconnect();
	// const res= await axios.get(`${process.env.HOST}/api/post`,{headers: {
	// 	"Content-Type": "application/json"}})

	// let data=''
	// if (res) {
	// 	data=res.data
	// } else {
	// 	data=[]
	// }

	console.log('from serverprops',serPost)
	// if (session?.user) {
	//     return {
	//         redirect: {
	//             permanent: false,
	//             destination: "/"
	//         }
	//     }
	// }

	return {
		props: { 
			session,
			data:serPost
			// data:posts.map((post) => ({
			// 	_id: post._id.toString(),
			// 	title: post.input,
			// 	username: post.username,
			// 	content: post.content,
			// 	createdAt: post.createdAt,
			//   })),
		 }
	};
}
