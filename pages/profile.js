import React, { useState, useEffect, useReducer } from 'react';
import Loader from '../components/Loader/Loader';
import { Suspense } from 'react';

{
  /* <Suspense fallback={<Loader />}>
</Suspense> */
}

import db from '../utils/db';
import postModel from '../models/post';
import communityModel from '../models/community';

import styles2 from '../sections/Profile/MainSection.module.css';

import Head from 'next/head';
import Image from 'next/image';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';

import moment from 'moment';

import trendingIcon from '../assets/home-page/trending-icon.svg';
import newIcon from '../assets/home-page/new-icon.svg';
import userIcon from '../assets/home-page/user-icon.svg';
import futureMoreVertical from '../assets/home-page/futureMoreVertical-icon.svg';
import numberOfViewsIcon from '../assets/home-page/numberOfViewsIcon.svg';
import likeIcon from '../assets/home-page/like-icon.svg';
import dislike from '../assets/home-page/dislike-icon.svg';
import shareIcon from '../assets/home-page/share-icon.svg';

import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStore } from '../context';
import { authConstants } from '../context/constants';
import ProfileCard from '../components/ProfileCard/ProfileCard';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  await db.connect();

  const posts = await postModel
    .find({ 'user.id': session?.user?._id })
    .sort({ _id: -1 })
    .lean();

  const community = await communityModel
    .find({ 'user.id': session?.user?._id })
    .sort({ _id: -1 })
    .lean();

  await db.disconnect();

  return {
    props: {
      session,
      myPost: posts ? JSON.parse(JSON.stringify(posts)) : null,
      myCommunity: community ? JSON.parse(JSON.stringify(community)) : null,
      // posts.map(db.convertDocToObj),
      // posts ? JSON.parse(JSON.stringify(posts)) : null
    },
  };
}

export default function Profile({ myPost, myCommunity }) {
  const [state, dispatch] = useStore();

  const { status, data: session } = useSession();

  const [mobileMenu, setmobileMenu] = useState(false);

  const router = useRouter();

  // console.log('from state', state.userProfile);
  const toggle = () => {
    dispatch({
      type: authConstants.TOGGLE,
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       dispatch({ type: 'FETCH_REQUEST' });
  //       const { data } = await axios.get(`/api/post`);
  //       dispatch({ type: 'FETCH_SUCCESS', payload: data });
  //     } catch (err) {
  //       dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
  //     }
  //   };
  //   fetchData();
  // }, []);

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
      <LeftSideBar />
      <section className={styles2.rigtbar_section}>
        <div className={styles2.rigtbar_section_a}>
          {/* <button className={styles2.btn_rightbar_trending}>
            <Image
              width={12}
              height={12}
              src={trendingIcon}
              alt='trending_icon'
            />
            Overview
          </button>
          <button className={styles2.btn_rightbar_new}>
            <Image width={10} height={10} src={newIcon} alt='start_icon' />
            Post
          </button> */}
          {myPost.map((post) => {
            return (
              <div
                // onClick={() => router.push(`/post/community-post/${post?._id}`)}
                key={post?._id}
                className={styles2.post_card}
              >
                <div className={styles2.container_a}>
                  {/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
                  <div className={styles2.profile__image}>
                    {post?.user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div
                    style={{ cursor: 'pointer' }}
                    className={styles2.inner_a}
                  >
                    <p>{post?.user?.username}</p>
                    <p>{moment(post?.createdAt).fromNow()}</p>
                  </div>
                  {session?.user?._id === post?.user?.id ? (
                    <Link href={`/post/${post?._id}`}>
                      <Image
                        width={24}
                        height={24}
                        src={futureMoreVertical}
                        alt='feature_pix'
                      />
                    </Link>
                  ) : (
                    <a href=''></a>
                  )}
                </div>
                <h3 className={styles2.myHeader}>
                  <Link href={`/post/community-post/${post?._id}`}>
                    {post?.title}
                  </Link>
                </h3>
                <Link
                  className={styles2.myTitle}
                  href={`/post/community-post/${post?._id}`}
                >
                  {replaceWithBr2(cutText(post?.content))}
                </Link>

                {post?.image && (
                  <div className={styles2.imageContainer}>
                    <Image
                      // unoptimized
                      className={styles2.postImage}
                      src={post?.image}
                      alt='post_image'
                      fill
                    />
                  </div>
                )}

                <div className={styles2.inner_b}>
                  <div className={styles2.inner_ba}>
                    <button className={styles2.btn_post}>
                      {post.community}
                      {''} Community
                    </button>
                  </div>
                  {/* <div className={styles2.inner_bb}>
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
              </div>
            );
          })}

          {myPost?.length === 0 && (
            <h2 style={{ marginTop: '20px', color: 'gray' }}>
              You do not have any post{' '}
            </h2>
          )}
        </div>
        <ProfileCard community={myCommunity} />
      </section>
    </div>
  );
}
