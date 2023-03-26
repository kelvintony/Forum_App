import React, { useState, useEffect, useReducer } from 'react';
import Loader from '../components/Loader/Loader';
import { Suspense } from 'react';

{
  /* <Suspense fallback={<Loader />}>
</Suspense> */
}

import db from '../utils/db';
import postModel from '../models/post';

import styles from '../styles/Moderate.module.css';

import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';
import MainSection from '../sections/home/MainSection';
import RightSideBar from '../sections/home/RightSideBar';

import moment from 'moment';

import trendingIcon from '../assets/home-page/trending-icon.svg';
import newIcon from '../assets/home-page/new-icon.svg';
import userIcon from '../assets/home-page/user-icon.svg';
import futureMoreVertical from '../assets/home-page/futureMoreVertical-icon.svg';
import numberOfViewsIcon from '../assets/home-page/numberOfViewsIcon.svg';
import likeIcon from '../assets/home-page/like-icon.svg';
import dislike from '../assets/home-page/dislike-icon.svg';
import shareIcon from '../assets/home-page/share-icon.svg';

import { signIn, getSession, useSession } from 'next-auth/react';
import axios from 'axios';

import { useRouter } from 'next/router';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  await db.connect();

  const posts = await postModel
    .find({ 'user.id': session?.user?._id })
    .sort({ _id: -1 })
    .lean();

  await db.disconnect();
  return {
    props: {
      session,
      myPost: posts ? JSON.parse(JSON.stringify(posts)) : null,
    },
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, posts: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function ModeratePost({ session: serverSession, myPost }) {
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: true,
    posts: [],
    error: '',
  });

  const [mobileMenu, setmobileMenu] = useState(false);

  const router = useRouter();
  const { status, data: session } = useSession();

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };

  useEffect(() => {
    window.localStorage.setItem(
      'profile',
      session ? JSON.stringify(session?.user) : ''
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/post`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  //
  //
  const cutText = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 150) + ' ...';
    }
    return str;
  };

  // function replaceWithBr(value) {
  //   return value.replace(/\n/g, '<br />');
  // }

  const mystyle = {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: '0.05em',
    color: '#808080',
  };
  function replaceWithBr2(value) {
    let str = value;
    let result = str.split('\n');
    return result.map((i, key) => <p key={key}>{i + '\n'}</p>);
  }
  return (
    <div>
      {/* <Navbar openMenu={toggle} session={session} /> */}
      <section className={styles.rigtbar_section}>
        <LeftSideBar />
        <div className={styles.rigtbar_section_a}>
          <h3 className={styles.mode_header}>Post Moderation</h3>
          {myPost.map((post) => {
            return (
              <div
                // onClick={() => router.push(`/post/community-post/${post?._id}`)}
                key={post?._id}
                className={styles.post_card}
              >
                <div className={styles.inner_leftSide}>
                  <div className={styles.container_a}>
                    {/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
                    <div className={styles.profile__image}>
                      {post?.user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.inner_a}>
                      <p>{post?.user?.username}</p>
                      <p>{moment(post?.createdAt).fromNow()}</p>
                    </div>
                    <a href=''></a>
                  </div>
                  <h3 className={styles.myHeader}>
                    <Link href={`/post/community-post/${post?._id}`}>
                      {post?.title}
                    </Link>
                  </h3>
                  <Link
                    className={styles.myTitle}
                    href={`/post/community-post/${post?._id}`}
                  >
                    {replaceWithBr2(cutText(post?.content))}
                  </Link>

                  <div className={styles.inner_b}>
                    <div className={styles.inner_ba}>
                      <button className={styles.btn_post}>
                        {post?.community}
                        {''} community
                      </button>
                    </div>
                    {/* <div className={styles.inner_bb}>
                      <a href=''>
                        <Image src={numberOfViewsIcon} alt='views_pix' />
                        125
                      </a>
                      <a href=''>
                        <Image src={likeIcon} alt='views_pix' />
                        125
                      </a>
                      <a href=''>
                        <Image src={dislike} alt='views_pix' />
                        125
                      </a>
                      <a href=''>
                        <Image src={shareIcon} alt='views_pix' />
                        155
                      </a>
                    </div> */}
                  </div>
                  <div className={styles.btn_container}>
                    <button className={styles.btn_register}>Remove Post</button>
                    <button className={styles.btn_register}>
                      Publish Post
                    </button>
                  </div>
                </div>
                <div className={styles.inner_rightSide}>
                  <div className={styles.container_a}>
                    {/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
                    {/* <div className={styles.profile__image}>
                      {post?.user?.username?.charAt(0).toUpperCase()}
                    </div> */}
                    <div className={styles.inner_a}>
                      <p> {post?.community} Community</p>
                      <p>55k Members</p>
                    </div>
                    <a href=''></a>
                  </div>
                  <div className={styles.btn_container}>
                    <button className={styles.btn_register}>Block User</button>
                    <button className={styles.btn_unblock}>Unblock User</button>
                  </div>
                </div>
              </div>
            );
          })}

          {myPost?.length === 0 && (
            <h2 style={{ marginTop: '20px', color: 'gray' }}>
              Your Mod Que is clean{' '}
            </h2>
          )}
        </div>
      </section>
    </div>
  );
}
