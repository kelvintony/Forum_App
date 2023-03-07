import React, { useState, useEffect } from 'react';
import styles from './Comment.module.css';
import Image from 'next/image';
import sendPostIcon from '../../assets/sendPost_icon.svg';
import moment from 'moment';

import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiFillDislike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';

import { BsArrowReturnRight } from 'react-icons/bs';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';
import axios from 'axios';

import reply_icon from '../../assets/reply_icon.png';
import futureMoreVertical from '../../assets/home-page/futureMoreVertical-icon.svg';

import { useRouter } from 'next/router';
import { useStore } from '../../context';
import { authConstants } from '../../context/constants';
import CommentModal from '../CommentModal/CommentModal';

const Comment = () => {
  const { status, data: session } = useSession();

  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { id } = router.query;

  const [comments, setComments] = useState([]);

  const [state, dispatch] = useStore();

  const [commentDescription, setCommentDescription] = useState('');

  const [singlePost, setSinglePost] = useState({});

  const [loading, setLoading] = useState(false);

  const [repliedComment, setRepliedComment] = useState([]);

  const [showModal, setShowModal] = useState(false);

  // console.log('from comment');
  // console.log('from comment', state.forumData);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment`);
        const res2 = await axios.get(`/api/comment/replycomment`);
        setComments(res.data);
        setRepliedComment(res2.data);

        dispatch({
          type: authConstants.FETCH_REPLIED_COMMENT,
          payload: res2.data,
        });
      } catch (err) {}
    };
    fetchComments();
  }, [dispatch, router, id]);

  // console.log(state?.repliedCommentData?.comments);
  useEffect(() => {
    const getCommunity2 = async () => {
      dispatch({
        type: authConstants.FETCH_COMMENT_REQUEST,
      });
      await axios
        .get(`/api/comment`)
        .then((res) => {
          let myComment = [];
          myComment = res?.data?.filter((data) => {
            return data?.postId === id;
          });
          dispatch({
            type: authConstants.FETCH_COMMENT_SUCCESS,
            payload: myComment,
          });
        })
        .catch((err) => {
          console.log('');
          // dispatch({
          //   type: authConstants.FETCH_COMMENT_FALURE,
          //   payload: err?.reponse?.data,
          // });
          // console.log(err);
        });
    };
    getCommunity2();
  }, [dispatch, router, id, singlePost]);

  const createComment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/comment`, {
        postId: id,
        content: commentDescription,
      });

      dispatch({
        type: authConstants.CREATE_COMMENT,
        payload: res.data,
      });
      setCommentDescription('');

      setLoading(false);
    } catch (err) {}
  };

  const createRepliedComment = async (com_id) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/comment/replycomment`, {
        postId: id,
        commentId: com_id,
        content: 'xxxxxxx',
      });

      dispatch({
        type: authConstants.CREATE_REPLIED_COMMENT,
        payload: res.data,
      });
      // setCommentDescription('');

      setLoading(false);
    } catch (err) {}
  };

  const handleLike = async (id, postx) => {
    try {
      // const res = await axios.put(`/api/post/likepost/${id}`);

      if (!session?.user?._id) {
        return alert('you need to signin in other to like a post');
      }

      const spost = await axios.get(`/api/comment/${id}`);

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
        await axios.put(`/api/comment/likecomment/${id}`);

        setSinglePost(spost);

        // console.log('it ran');
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
      const spost = await axios.get(`/api/comment/${id}`);
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
        await axios.put(`/api/comment/dislikecomment/${id}`);

        setSinglePost(spost);

        // console.log('it ran');
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className={styles.wrapper}>
      <h1>Leave a comment</h1>
      <div className={styles.comment_container}>
        <input
          className={styles.txt_community}
          type='text'
          placeholder='Leave a comment'
          value={commentDescription}
          onChange={(e) => setCommentDescription(e.target.value)}
        />
        <div className={styles.interet_btnInner}>
          <button className={`${styles.btn_draft} ${styles.btn_create}`}>
            Cancel
          </button>
          <button
            onClick={createComment}
            className={`${styles.btn_image} ${styles.btn_create}`}
          >
            {!loading && <Image src={sendPostIcon} alt='create_pix' />}
            {loading ? 'Submiting...' : 'Comment'}
          </button>
        </div>
      </div>
      {state.commentData?.comments?.map((post) => {
        return (
          <div
            // onClick={() => router.push(`/post/community-post/${post?._id}`)}
            key={post?._id}
            className={styles.post_card}
          >
            <div className={styles.container_a}>
              {/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
              <div className={styles.profile__image}>
                {post?.user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className={styles.inner_a}>
                <p>{post?.user?.username}</p>
                <p>{moment(post?.createdAt).fromNow()}</p>
              </div>
              {session?.user?._id === post?.user?.id ? (
                <a href='#'>
                  <Image
                    width={24}
                    height={24}
                    src={futureMoreVertical}
                    alt='feature_pix'
                  />
                </a>
              ) : (
                <a href=''></a>
              )}
            </div>

            <a className={styles.myTitle} href='#'>
              {replaceWithBr2(cutText(post?.content))}
            </a>

            <hr className={styles.comment_divider} />
            <div className={styles.inner_b}>
              <div className={styles.inner_bb}>
                {/* <a href=''>
                      <Image src={numberOfViewsIcon} alt='views_pix' />
                      125
                    </a> */}
                <button onClick={() => handleLike(post._id, post)}>
                  {/* <Image src={likeIcon} alt='views_pix' /> */}
                  {post?.likes?.includes(session?.user?._id) ? (
                    <AiFillLike size={12} />
                  ) : (
                    <AiOutlineLike size={12} />
                  )}
                  {post?.likes?.length > 0 ? post?.likes?.length : 0}
                </button>
                <button onClick={() => handleDisLike(post._id, post)}>
                  {/* <Image src={dislike} alt='views_pix' /> */}
                  {post?.dislikes?.includes(session?.user?._id) ? (
                    <AiFillDislike size={12} />
                  ) : (
                    <AiOutlineDislike size={12} />
                  )}
                  {post?.dislikes?.length > 0 ? post?.dislikes?.length : 0}
                </button>
                {/* <a href=''> 
                      <Image src={shareIcon} alt='views_pix' />
                      155
                    </a> */}
              </div>
              <div className={styles.inner_ba}>
                <button className={styles.show_replies}>
                  <AiOutlineArrowDown size={12} />
                  Show all replies
                </button>
                <button
                  onClick={() => router.push(`/replycomment/${post._id}`)}
                  className={styles.reply}
                >
                  <BsArrowReturnRight size={12} />
                  Reply
                </button>
              </div>
            </div>
            <div className={styles.comment_container2}>
              {state?.repliedCommentData?.comments?.map((com) => {
                return (
                  com.commentId === post._id && (
                    <div
                      // onClick={() => router.push(`/post/community-post/${post?._id}`)}
                      key={com?._id}
                      className={`${styles.post_card} ${styles.post_card2}`}
                    >
                      <div className={styles.container_a}>
                        {/* <Image width={40} height={40} src={userIcon} alt='user_pix' /> */}
                        <div className={styles.profile__image}>
                          {com?.user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.inner_a}>
                          <p>{com?.user?.username}</p>
                          <p>{moment(com?.createdAt).fromNow()}</p>
                        </div>
                        {session?.user?._id === com?.user?.id ? (
                          <a href='#'>
                            <Image
                              width={24}
                              height={24}
                              src={futureMoreVertical}
                              alt='feature_pix'
                            />
                          </a>
                        ) : (
                          <a href=''></a>
                        )}
                      </div>

                      <a className={styles.myTitle} href='#'>
                        {replaceWithBr2(cutText(com?.content))}
                      </a>

                      <hr className={styles.comment_divider} />
                      <div className={styles.inner_b}>
                        <div className={styles.inner_bb}>
                          {/* <a href=''>
                              <Image src={numberOfViewsIcon} alt='views_pix' />
                              125
                            </a> */}
                          <button onClick={() => handleLike(post._id, post)}>
                            {/* <Image src={likeIcon} alt='views_pix' /> */}
                            {com?.likes?.includes(session?.user?._id) ? (
                              <AiFillLike size={12} />
                            ) : (
                              <AiOutlineLike size={12} />
                            )}
                            {com?.likes?.length > 0 ? com?.likes?.length : 0}
                          </button>
                          <button onClick={() => handleDisLike(post._id, post)}>
                            {/* <Image src={dislike} alt='views_pix' /> */}
                            {com?.dislikes?.includes(session?.user?._id) ? (
                              <AiFillDislike size={12} />
                            ) : (
                              <AiOutlineDislike size={12} />
                            )}
                            {com?.dislikes?.length > 0
                              ? com?.dislikes?.length
                              : 0}
                          </button>
                          {/* <a href=''> 
                              <Image src={shareIcon} alt='views_pix' />
                              155
                            </a> */}
                        </div>
                        <div className={styles.inner_ba}>
                          {/* <button className={styles.show_replies}>
                            <AiOutlineArrowDown size={12} />
                            Show all replies
                          </button> */}
                          <button></button>
                          <button
                            onClick={() =>
                              router.push(`/replycomment/${post._id}`)
                            }
                            className={styles.reply}
                          >
                            <BsArrowReturnRight size={12} />
                            Reply
                          </button>
                        </div>
                      </div>
                      {showModal && (
                        <CommentModal
                          commentId={
                            post._id === com.commentId ? post._id : null
                          }
                          closeModal={toggleModal}
                        />
                      )}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
      {/* {showModal && <CommentModal commentId={post._id} closeModal={toggleModal} />} */}
    </div>
  );
};

export default Comment;
