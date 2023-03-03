import React, { useEffect, useState, useRef } from 'react';
import styles from '../../styles/SingleCommunity.module.css';
import styles2 from '../../sections/home/MainSection.module.css';

import PostModal from '../../components/PostModal/PostModal';

import Image from 'next/image';

import LeftSideBar from '../../components/leftSideBar/LeftSideBar';
import RightSideBar from '../../sections/home/RightSideBar';

import profile_pic from '../../assets/single_community/profile-pic.svg';
import banner_image2 from '../../assets/single_community/banner_image2.jpg';
import trending_icon from '../../assets/home-page/trending-icon.svg';
import post_icon from '../../assets/post_icon.svg';
import new_icon from '../../assets/home-page/new-icon.svg';
import feather_more_horizontal from '../../assets/single_community/feather_more_horizontal.svg';
import dropdown from '../../assets/single_community/dropdown.svg';
import user_icon from '../../assets/home-page/user-icon.svg';
import futureMoreVertical_icon from '../../assets/home-page/futureMoreVertical-icon.svg';
import numberOfViewsIcon from '../../assets/home-page/numberOfViewsIcon.svg';
import like_icon from '../../assets/home-page/like-icon.svg';
import dislike_icon from '../../assets/home-page/dislike-icon.svg';
import share_icon from '../../assets/home-page/share-icon.svg';

import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useStore } from '../../context';

import moment from 'moment';
import Link from 'next/link';
import { AiFillDislike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';

import { authConstants } from '../../context/constants';
import Loader from '../../components/Loader/Loader';

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   const { params } = context;
//   const { id } = params;

//   console.log(id);

//   // await db.connect();
//   // const post = await postModel.findOne({ _id: id });

//   // const { updatedAt, ...others } = post._doc;
//   // await db.disconnect();
//   return {
//     props: {
//       session,
//       // post: others ? JSON.parse(JSON.stringify(others)) : null,
//     },
//   };
// }

const Singlecommunity = () => {
  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { id } = router.query;

  const [mobileMenu, setmobileMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  const [getThePost, setGetThePost] = useState([]);

  const [state, dispatch] = useStore();

  const [singlePost, setSinglePost] = useState({});

  const { status, data: session } = useSession();

  // console.log('from single community', state?.forumData[2]?.data);
  // console.log('from single community');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getCommunity = async () => {
      try {
        const singleCommunity = await axios.get(`/api/community/${id}`);

        const allPost = await axios.get('/api/post');

        if (singleCommunity) {
          setLoading(false);
        }
        setGetThePost(
          allPost?.data?.filter((data) => {
            return data?.community === singleCommunity.data?.communityName;
          })
        );

        // console.log('all community', allCommunity?.data);
        // console.log('single community', singleCommunity?.data);
      } catch (error) {
        console.log('');
      }
    };
    getCommunity();
    // console.log('effect ran');
  }, [dispatch, router, id]);

  useEffect(() => {
    const getCommunity2 = async () => {
      dispatch({
        type: authConstants.FETCH_SINGLE_COMMUNITY_REQUEST,
      });
      await axios
        .get(`/api/community/${id}`)
        .then((res) => {
          dispatch({
            type: authConstants.FETCH_SINGLE_COMMUNITY_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log('');
          // console.log(err);
        });
    };
    getCommunity2();
  }, [dispatch, router, id]);

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };

  const cutText = (str) => {
    if (str?.length > 45) {
      str = str?.substring(0, 150) + ' ...';
    }
    return str;
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
        // setSinglePost(spost);
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
        // setSinglePost(spost);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const navigateCommunityList = (id) => {
  //   router.push(`/community-list/${id}`);
  // };

  const handleJoin = async () => {
    if (!session?.user?._id) {
      router.push('/signin');
      return;
    }
    state?.communityData?.users?.includes(session?.user?._id)
      ? await axios.put(`/api/community/unsubscribe/${id}`)
      : await axios.put(`/api/community/subscribe/${id}`);

    dispatch({
      type: authConstants.JOIN_COMMUNITY,
      payload: session?.user?._id,
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div>
      <section className={styles.rigtbar_section}>
        <LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />
        <div className={styles.rigtbar_section_a}>
          <div className={styles.banner_container}>
            <div className={styles.banner_image_container}>
              {/* <Image src={banner_image2} alt='pix_1' fill /> */}
              {/* {state?.communityData?.image && (
                <Image
                  className={styles.postImage}
                  src={state?.communityData?.image}
                  alt='pix_1'
                  fill
                />
              )} */}
              {loading ? (
                <Loader />
              ) : (
                <Image
                  className={styles.postImage}
                  src={state?.communityData?.image}
                  alt='pix_1'
                  fill
                />
              )}
            </div>

            <div className={styles.banner_container_inner}>
              <Image width={40} height={40} src={profile_pic} alt='user_pix' />
              <div className={styles.banner_inner_a}>
                <div className={styles.edit_container}>
                  <h3 className={styles.title}>
                    {state?.communityData?.communityName} Community
                  </h3>
                  {session?.user?._id === state?.communityData?.user?.id && (
                    <button className={styles.editBtn}>
                      <FaRegEdit size={18} />
                    </button>
                  )}
                </div>
                <p>{state?.communityData?.users?.length} Members </p>
              </div>
              {session?.user?._id === state?.communityData?.user?.id ? null : (
                <button onClick={handleJoin} className={styles.btn_join}>
                  {state?.communityData?.users?.includes(session?.user?._id)
                    ? 'Leave'
                    : 'Join'}
                </button>
              )}
            </div>
          </div>

          <hr className={styles.banner_line} />

          <div className={styles.singlePost_btnContainer}>
            <button className={styles.btn_rightbar_trending}>
              <Image
                width={12}
                height={12}
                src={trending_icon}
                alt='trending_icon'
              />{' '}
              Hot
            </button>
            <button className={styles.btn_rightbar_new}>
              <Image width={15} height={15} src={post_icon} alt='start_icon' />
              New
            </button>
            <button className={styles.btn_rightbar_new}>
              <Image width={9} height={9} src={new_icon} alt='start_icon' />
              Top
            </button>
            <Image src={feather_more_horizontal} alt='more_icon' />
            <Image src={dropdown} alt='more_icon' />
          </div>
          {state?.communityData?.users?.includes(session?.user?._id) && (
            <div
              style={{ marginTop: '20px' }}
              className={styles.singlePost_btnContainer}
            >
              <button
                onClick={toggleModal}
                className={styles.btn_rightbar_trending}
              >
                Create a post
              </button>
            </div>
          )}

          {session?.user?._id === state?.communityData?.user?.id && (
            <div
              style={{ marginTop: '20px' }}
              className={styles.singlePost_btnContainer}
            >
              <button
                onClick={toggleModal}
                className={styles.btn_rightbar_trending}
              >
                Create a post
              </button>
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            getThePost?.map((post) => {
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
                    <div className={styles2.inner_a}>
                      <p>{post?.user?.username}</p>
                      <p>{moment(post?.createdAt).fromNow()}</p>
                    </div>
                    {session?.user?._id === post?.user?.id ? (
                      <Link href={`/post/${post?._id}`}>
                        <Image
                          width={24}
                          height={24}
                          src={futureMoreVertical_icon}
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
                        {post?.community}
                        {''} Community
                      </button>
                    </div>
                    <div className={styles2.inner_bb}>
                      {/* <a href=''>
                      <Image src={numberOfViewsIcon} alt='views_pix' />
                      125
                    </a> */}
                      <button onClick={() => handleLike(post._id, post)}>
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
                        {post?.dislikes?.length > 0
                          ? post?.dislikes?.length
                          : 0}
                      </button>
                      {/* <a href=''> 
                      <Image src={shareIcon} alt='views_pix' />
                      155
                    </a> */}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {getThePost.length === 0 && loading === false && (
            <h3 style={{ marginTop: '30px' }}>
              No Post related to the community at the moment
            </h3>
          )}
        </div>

        <RightSideBar />
      </section>

      {showModal && (
        <PostModal
          community={state?.communityData?.communityName}
          closeModal={toggleModal}
        />
      )}
    </div>
  );
};

export default Singlecommunity;
