import React, { useState, useEffect, useReducer } from 'react';
import Loader from '../../../components/Loader/Loader';

import db from '../../../utils/db';
import postModel from '../../../models/post';

import styles2 from '../../../sections/home/MainSection.module.css';

import Head from 'next/head';
import Image from 'next/image';
import LeftSideBar from '../../../components/leftSideBar/LeftSideBar';
import RightSideBar from '../../../sections/home/RightSideBar';

import moment from 'moment';

import futureMoreVertical from '../../../assets/home-page/futureMoreVertical-icon.svg';

import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

import { useRouter } from 'next/router';
import Comment from '../../../components/Comment/Comment';

import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { params } = context;
  const { id } = params;

  await db.connect();
  const post = await postModel.findOne({ _id: id }).lean();

  // console.log('single post', post);
  await db.disconnect();

  return {
    props: {
      session,
      myPost: post ? JSON.parse(JSON.stringify(post)) : null,
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

export default function Home({ session, myPost }) {
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: true,
    posts: [],
    error: '',
  });

  const [mobileMenu, setmobileMenu] = useState(false);
  // const [getPost, setGetPost] = useState('');
  // const [loadme, setLoadme] = useState(false);

  const router = useRouter();
  const mySession = useSession();

  //want to work on this
  const [showText, setShowText] = useState(false);

  //   console.log("cusSess", mySession);
  // console.log('cusSess', mySession?.data?.user._id);

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
  const toggleText = () => {
    setShowText(!showText);
  };

  const cutText = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 150) + ' ...';
    }
    return str;
  };

  const replaceWithBr = (value) => {
    return value.replace(/\n/g, '<br />');
  };

  const replaceWithBr2 = (value) => {
    let str = value;
    let result = str.split('\n');
    return result.map((i, key) => <p key={key}>{i + '\n'}</p>);
  };

  const simpleDiv = {
    height: '300px',
    width: '300px',
    paddingLeft: '90px',
    zIndex: '-1',
  };

  const navigateToProfile = (id) => {
    router.push(`/user-profile/${id}`);
  };

  const [showEditContainer, setShowEditContainer] = useState(false);

  const handleShowEditContainer = () => {
    setShowEditContainer(!showEditContainer);
  };

  const handleEditPost = (postId) => {
    router.push(`/post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    await axios.delete(`/api/post/${postId}`).then((res) => {
      alert('Deleted successfully');
    });
    router.push('/');
  };

  return (
    <div>
      <LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />
      <section className={styles2.rigtbar_section}>
        <div className={styles2.rigtbar_section_a}>
          <div key={myPost?._id} className={styles2.post_card}>
            <div style={{ cursor: 'pointer' }} className={styles2.container_a}>
              {/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
              <div
                onClick={() => navigateToProfile(myPost?.user?.id)}
                className={styles2.profile__image}
              >
                {myPost?.user?.username?.charAt(0).toUpperCase()}
              </div>
              <div
                onClick={() => navigateToProfile(myPost?.user?.id)}
                className={styles2.inner_a}
              >
                <p>{myPost?.user?.username}</p>
                <p>{moment(myPost?.createdAt).fromNow()}</p>
              </div>
              {mySession?.data?.user?._id === myPost?.user?.id ? (
                <button
                  onClick={handleShowEditContainer}
                  className={styles2.edit_icon2}
                >
                  <Image
                    width={24}
                    height={24}
                    src={futureMoreVertical}
                    alt='feature_pix'
                  />
                </button>
              ) : (
                <a href=''></a>
              )}
              {session?.user?._id === myPost?.user?.id && showEditContainer && (
                <div className={styles2.edit_container}>
                  <button
                    onClick={() => handleEditPost(myPost._id)}
                    className={styles2.btn_edit_button}
                  >
                    <AiOutlineEdit size={24} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you wish to delete this post?'
                        )
                      )
                        handleDeletePost(myPost._id);
                    }}
                    className={styles2.btn_edit_button}
                  >
                    <AiOutlineDelete size={24} />
                    Delete
                  </button>
                </div>
              )}
            </div>
            <h3>{myPost?.title}</h3>
            {myPost?.image && (
              <div className={styles2.imageContainer}>
                <Image
                  // unoptimized
                  className={styles2.postImage}
                  src={myPost?.image}
                  alt='post_image'
                  fill
                />
              </div>
            )}
            {replaceWithBr2(myPost?.content)}
          </div>
          <Comment />
          {/* <Comment /> */}
        </div>

        {/* comment section */}
        <RightSideBar />
      </section>
    </div>
  );
}
