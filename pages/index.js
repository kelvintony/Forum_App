import React, { useState, useEffect } from 'react';

import db from '../utils/db';
import postModel from '../models/post';
import styles2 from '../sections/home/MainSection.module.css'


import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';
import MainSection from '../sections/home/MainSection';
import RightSideBar from '../sections/home/RightSideBar';

import moment from 'moment'

import trendingIcon from '../assets/home-page/trending-icon.svg';
import newIcon from '../assets/home-page/new-icon.svg';
import userIcon from '../assets/home-page/user-icon.svg';
import futureMoreVertical from '../assets/home-page/futureMoreVertical-icon.svg';
import numberOfViewsIcon from '../assets/home-page/numberOfViewsIcon.svg';
import likeIcon from '../assets/home-page/like-icon.svg';
import dislike from '../assets/home-page/dislike-icon.svg';
import shareIcon from '../assets/home-page/share-icon.svg';

import { signIn, getSession } from 'next-auth/react';
import axios from 'axios';

import { useRouter } from 'next/router';

export default function Home({ session,data }) {
	const [ mobileMenu, setmobileMenu ] = useState(false);
	const [ getPost, setGetPost ] = useState('');

	const router = useRouter();

	const toggle = () => {
		setmobileMenu(!mobileMenu);
	};

	useEffect(() => {
		window.localStorage.setItem('profile', session?JSON.stringify(session?.user):'');
	}, []);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			// const { data } = await axios.get(`/api/post`);
			const res = await fetch('/api/post')
			const data= await res.json();
			setGetPost(data)
		  } catch (err) {
			console.log(err)
		  }
		};
		fetchData();
	  }, []);
	// console.log('from home page', session);
		console.log(getPost)

		//
		//
		const cutText = (str) => {
			if (str.length > 45) {
			  str = str.substring(0, 150) + " ...";
			}
			return str;
		  };
		
		function replaceWithBr(value) {
			return value.replace(/\n/g, "<br />")
		  }
	
		function replaceWithBr2(value) {
			let str = value;
			let result = str.split("\n"); 
			return result.map((i, key) => <p key={key}>{i + "\n"}</p>);
		  }
	

	return (
		<div>
			<Navbar openMenu={toggle} session={session} />
			<LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />
			<section className={styles2.rigtbar_section}>
			<div className={styles2.rigtbar_section_a}>
			<button className={styles2.btn_rightbar_trending}>
				<Image width={12} height={12} src={trendingIcon} alt='trending_icon' />
				Trending
			</button>
			<button className={styles2.btn_rightbar_new}>
				<Image width={10} height={10} src={newIcon} alt='start_icon' />New
			</button>
			
			{data?.map((post) => {
				return (
					<div key={post?._id} className={styles2.post_card}>
						<div className={styles2.container_a}>
							{/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
							<div className={styles2.profile__image}>{post?.user?.username?.charAt(0).toUpperCase()}</div>
							<div className={styles2.inner_a}>
								<p>{post?.user?.username}</p>
								<p>{moment(post?.createdAt).fromNow()}</p>
							</div>
							<a href=''>
								<Image width={24} height={24} src={futureMoreVertical} alt='feature_pix' />
							</a>
						</div>
						<h3>{post?.title}</h3>
				
						{replaceWithBr2(cutText(post?.content))}
						{/* {replaceWithBr2(post.content)} */}
						{/* <div dangerouslySetInnerHTML={{__html: replaceWithBr(post?.content)}}/> */}
						<div className={styles2.inner_b}>
							<div className={styles2.inner_ba}>
								<button className={styles2.btn_post}>goland</button>
								<button className={styles2.btn_post}>link</button>
								<button className={styles2.btn_post}>overflow</button>
							</div>
							<div className={styles2.inner_bb}>
								<a href=''>
									<Image src={numberOfViewsIcon} alt='views_pix' />125
								</a>
								<a href=''>
									<Image src={likeIcon} alt='views_pix' />125
								</a>
								<a href=''>
									<Image src={dislike} alt='views_pix' />125
								</a>
								<a href=''>
									<Image src={shareIcon} alt='views_pix' />155
								</a>
							</div>
						</div>
					</div>
				);
			})}

			<div className={styles2.post_card}>
				<div className={styles2.container_a}>
					<Image width={40} height={40} src={userIcon} alt='user_pix' />
					<div className={styles2.inner_a}>
						<p>Golanginya</p>
						<p>5 min ago</p>
					</div>
					<a href=''>
						<Image width={24} height={24} src={futureMoreVertical} alt='feature_pix' />
					</a>
				</div>
				<h3>How to patch KDE on FreeBSD? How to patch KDE on FreeBSD? FreeBSD?</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla</p>
				<div className={styles2.inner_b}>
					<div className={styles2.inner_ba}>
						<button className={styles2.btn_post}>goland</button>
						<button className={styles2.btn_post}>link</button>
						<button className={styles2.btn_post}>overflow</button>
					</div>
					<div className={styles2.inner_bb}>
						<a href=''>
							<Image src={numberOfViewsIcon} alt='views_pix' />125
						</a>
						<a href=''>
							<Image src={likeIcon} alt='views_pix' />125
						</a>
						<a href=''>
							<Image src={dislike} alt='views_pix' />125
						</a>
						<a href=''>
							<Image src={shareIcon} alt='views_pix' />155
						</a>
					</div>
				</div>
			</div> 
		</div>
				<RightSideBar />
			</section>
		</div>
	);
}
export async function getServerSideProps(context) {
	const session = await getSession(context);

	await db.connect();
	const posts = await postModel.find({}).populate('user', 'username');

	let serPost = JSON.parse(JSON.stringify(posts))
	await db.disconnect();
	// const res= await axios.get(`${process.env.HOST}/api/post`,{headers: {
	// 	"Content-Type": "application/json"}})

	// let data=''
	// if (res) {
	// 	data=res.data
	// } else {
	// 	data=[]
	// }

	// console.log('from serverprops',serPost)
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
			// 	createdAt: post.createdAt.toString(),
			// 	updatedAt:	post.updatedAt.toString()
			//   })),
		 }
	};
}
