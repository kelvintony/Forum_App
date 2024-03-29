import React, { useState, useEffect, useReducer } from 'react';
import Loader from '../components/Loader/Loader';
import { Suspense } from 'react';

{
  /* <Suspense fallback={<Loader />}>
</Suspense> */
}

import db from '../utils/db';
import postModel from '../models/post';
// import userModel from '../models/user';

import styles2 from '../sections/home/MainSection.module.css';

import Head from 'next/head';
import Image from 'next/image';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';
import RightSideBar from '../sections/home/RightSideBar';

import moment from 'moment';

import trendingIcon from '../assets/home-page/trending-icon.svg';
import newIcon from '../assets/home-page/new-icon.svg';
import futureMoreVertical from '../assets/home-page/futureMoreVertical-icon.svg';
import numberOfViewsIcon from '../assets/home-page/numberOfViewsIcon.svg';
import likeIcon from '../assets/home-page/like-icon.svg';
import dislike from '../assets/home-page/dislike-icon.svg';
import shareIcon from '../assets/home-page/share-icon.svg';

import { AiFillDislike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';

import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useStore } from '../context';
import { authConstants } from '../context/constants';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  await db.connect();

  const posts = await postModel.find().sort({ _id: -1 }).lean();
  // const users = await userModel.find({}).lean();

  // const combinedArray = posts.concat(users);

  // console.log('home page server', users);
  // console.log('home page combinedArray', combinedArray);

  await db.disconnect();

  return {
    props: {
      session,
      myPost: posts ? JSON.parse(JSON.stringify(posts)) : null,
    },
    // revalidate: 10,
  };
}

export default function Home({ myPost }) {
  const { status, data: session } = useSession();

  const [mobileMenu, setmobileMenu] = useState(false);

  const router = useRouter();

  const [state, dispatch] = useStore();

  const [posts, setPosts] = useState([]);

  const [singlePost, setSinglePost] = useState({});

  const [showEditContainer, setShowEditContainer] = useState(false);

  const handleShowEditContainer = () => {
    setShowEditContainer(!showEditContainer);
  };

  const handleEditPost = (postId) => {
    router.push(`/post/${postId}`);
  };

  useEffect(() => {
    const getPosts = async () => {
      // setLoading(true);
      await axios
        .get(`api/post`)
        .then((res) => {
          setPosts(res.data);
          // console.log(res.data);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPosts();
  }, [singlePost]);

  const handleDeletePost = async (postId) => {
    await axios.delete(`/api/post/${postId}`).then((res) => {
      alert('Deleted successfully');
    });

    setPosts((posts) => posts.filter((post) => post._id !== postId));
    setShowEditContainer(false);
  };

  // console.log('from home ', session?.user?.image);

  const cutText = (str) => {
    if (str?.length > 45) {
      str = str?.substring(0, 150) + ' ...';
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

  const handleLike = async (id, postx) => {
    try {
      // const res = await axios.put(`/api/post/likepost/${id}`);

      if (!session?.user?._id) {
        return alert('you need to signin in other to like a post');
      }

      const spost = await axios.get(`/api/post/${id}`);

      // console.log(spost.data.likes.includes(session?.user?._id));

      if (
        !postx.likes.includes(id) &&
        !spost.data.likes.includes(session?.user?._id)
      ) {
        postx.likes.push(id);
        postx.dislikes.splice(
          postx.dislikes.findIndex((userId) => userId === id),
          1
        );
        await axios.put(`/api/post/likepost/${id}`);

        // console.log('it ran');
        setSinglePost(spost);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDisLike = async (id, postx) => {
    try {
      if (!session?.user?._id) {
        return alert('you need to signin in other to dislike a post');
      }
      const spost = await axios.get(`/api/post/${id}`);
      // console.log(spost.data.dislikes.includes(session?.user?._id));

      if (
        !postx.dislikes.includes(id) &&
        !spost.data.dislikes.includes(session?.user?._id)
      ) {
        postx.dislikes.push(id);
        postx.likes.splice(
          postx.likes.findIndex((userId) => userId === id),
          1
        );
        await axios.put(`/api/post/dislikepost/${id}`);
        // console.log('it ran');
        setSinglePost(spost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('from fome', state?.forumData[0]?.data);

  const moveToCommunity = (communityName2) => {
    // let comeName = '';
    state?.forumData[0]?.data.map((data) => {
      if (data?.communityName === communityName2) {
        console.log(data);
        router.push(`/single-community/${data?._id}`);
      }
    });
    // router.push(`/single-community/${communityId}`);
    // console.log('this ran');
  };

  const navigateToProfile = (id) => {
    router.push(`/user-profile/${id}`);
  };
  return (
    <div>
      {/* <Navbar openMenu={toggle} session={session} /> */}
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
            Trending
          </button>
          <button className={styles2.btn_rightbar_new}>
            <Image width={10} height={10} src={newIcon} alt='start_icon' />
            New
          </button> */}
          {posts.map((post) => {
            return (
              <div
                // onClick={() => router.push(`/post/community-post/${post?._id}`)}
                key={post?._id}
                className={styles2.post_card}
              >
                <div
                  // onClick={() => navigateToProfile(post?.user?.id)}
                  className={styles2.container_a}
                  style={{ cursor: 'pointer' }}
                >
                  {/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
                  <div
                    onClick={() => navigateToProfile(post?.user?.id)}
                    className={styles2.profile__image}
                  >
                    {post?.user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div
                    onClick={() => navigateToProfile(post?.user?.id)}
                    className={styles2.inner_a}
                  >
                    <p>{post?.user?.username}</p>
                    <p>{moment(post?.createdAt).fromNow()}</p>
                  </div>
                  {session?.user?._id === post?.user?.id ? (
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
                  {session?.user?._id === post?.user?.id &&
                    showEditContainer && (
                      <div className={styles2.edit_container}>
                        <button
                          onClick={() => handleEditPost(post._id)}
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
                              handleDeletePost(post._id);
                          }}
                          className={styles2.btn_edit_button}
                        >
                          <AiOutlineDelete size={24} />
                          Delete
                        </button>
                      </div>
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
                    <button
                      onClick={() => moveToCommunity(post?.community)}
                      className={styles2.btn_post}
                    >
                      {post?.community}
                      {''} Community
                    </button>
                  </div>
                  <div className={styles2.inner_bb}>
                    {/* <a href=''>
                      <Image src={numberOfViewsIcon} alt='views_pix' />
                      125
                    </a> */}
                    <button onClick={() => handleLike(post?._id, post)}>
                      {/* <Image src={likeIcon} alt='views_pix' /> */}
                      {post?.likes?.includes(session?.user?._id) ? (
                        <AiFillLike />
                      ) : (
                        <AiOutlineLike />
                      )}
                      {post?.likes?.length > 0 ? post?.likes?.length : 0}
                    </button>
                    <button onClick={() => handleDisLike(post._id, post)}>
                      {/* <Image src={dislike} alt='views_pix' /> */}
                      {post?.dislikes?.includes(session?.user?._id) ? (
                        <AiFillDislike />
                      ) : (
                        <AiOutlineDislike />
                      )}
                      {post?.dislikes?.length > 0 ? post?.dislikes?.length : 0}
                    </button>
                    {/* <a href=''> 
                      <Image src={shareIcon} alt='views_pix' />
                      155
                    </a> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <RightSideBar />
      </section>
    </div>
  );
}
