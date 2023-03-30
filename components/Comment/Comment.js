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
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

import reply_icon from '../../assets/reply_icon.png';
import futureMoreVertical from '../../assets/home-page/futureMoreVertical-icon.svg';

import { useRouter } from 'next/router';
import { useStore } from '../../context';
import { authConstants } from '../../context/constants';
import CommentModal from '../CommentModal/CommentModal';
import EditComment from '../CommentModal/EditComment';
import EditRepliedComment from '../CommentModal/EditRepliedComment';

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

  const [showReplyModel, setShowReplyModel] = useState(false);

  const [showEditContainer, setShowEditContainer] = useState(false);

  const [showEditReplyDropDown, setShowEditReplyDropDown] = useState(false);

  const [showEditCommentModal, setShowEditCommentModal] = useState(false);

  const [showReplyEditCommentModal, setShowReplyEditCommentModal] =
    useState(false);

  const handleShowEditContainer = () => {
    setShowEditContainer(!showEditContainer);
  };

  const handleShowEditReplyDropdwon = () => {
    setShowEditReplyDropDown(!showEditReplyDropDown);
  };

  const handleEditComment = (comment_id, comment_content) => {
    setShowEditContainer(!showEditContainer);

    setShowEditCommentModal(!showEditCommentModal);

    window.sessionStorage.setItem('commentId', JSON.stringify(comment_id));
    window.sessionStorage.setItem(
      'commentContent',
      JSON.stringify(comment_content)
    );
  };

  const handleEditReplyComment = (
    comment_id,
    comment_content,
    comment_username
  ) => {
    setShowEditReplyDropDown(!showEditReplyDropDown);

    setShowReplyEditCommentModal(!showReplyEditCommentModal);

    window.sessionStorage.setItem('commentId', JSON.stringify(comment_id));
    window.sessionStorage.setItem(
      'commentContent',
      JSON.stringify(comment_content)
    );
    window.sessionStorage.setItem(
      'commentUsername',
      JSON.stringify(comment_username)
    );
  };

  // const handleEditComment2 = (postId) => {
  //   router.push(`/post/${postId}`);
  // };

  // console.log('from comment');
  // console.log('from comment', state.forumData);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleModalEditPost = () => {
    setShowEditCommentModal(!showEditCommentModal);
  };

  const toggleModalReplyEditPost = () => {
    setShowReplyEditCommentModal(!showReplyEditCommentModal);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/comment`);
        const res2 = await axios.get(`/api/comment/replycomment`);
        setComments(res.data);
        setRepliedComment(res2.data);

        let myRepliedComment = [];
        myRepliedComment = res2?.data?.filter((data) => {
          return data?.postId === id;
        });
        dispatch({
          type: authConstants.FETCH_REPLIED_COMMENT,
          payload: myRepliedComment,
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

  const handleDeleteComment = async (comment__id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/comment/${comment__id}`);

      if (res) {
        setLoading(false);
        dispatch({
          type: authConstants.DELETE_COMMENT,
          payload: comment__id,
        });
        setShowEditContainer(!showEditContainer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRepliedComment = async (comment__id) => {
    if (!session?.user?._id) {
      return alert('you need to signin in other to make a comment');
    }
    try {
      setLoading(true);
      const res = await axios.delete(
        `/api/comment/replycomment/${comment__id}`
      );

      if (res) {
        setLoading(false);
        dispatch({
          type: authConstants.DELETE_REPLIED_COMMENT,
          payload: comment__id,
        });
        setShowEditReplyDropDown(!showEditReplyDropDown);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createComment = async () => {
    if (!session?.user?._id) {
      return alert('you need to signin in other to make a comment');
    }
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

  const numberOfReplies = (replyComm, postId) => {
    let data = replyComm.filter((comment) => comment.commentId === postId);

    return data?.length;
  };

  const cancelComment = () => {
    setCommentDescription('');
  };

  const toggleReplyModal = (replyComm, postId) => {
    if (!session?.user?._id) {
      return alert('you need to signin in other to reply a comment');
    }
    let data = replyComm.filter((comment) => comment.commentId === postId);

    data.length > 0 && setShowReplyModel(!showReplyModel);
  };

  const handleReplyComment = (comment_id, comment_username) => {
    if (!session?.user?._id) {
      return alert('you need to signin in other to reply a comment');
    }
    toggleModal();
    window.sessionStorage.setItem('commentId', JSON.stringify(comment_id));
    window.sessionStorage.setItem(
      'commentUsername',
      JSON.stringify(comment_username)
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1>
        {state?.commentData?.comments?.length +
          state?.repliedCommentData?.comments?.length}{' '}
        comments{' '}
      </h1>
      <div className={styles.comment_container}>
        <input
          className={styles.txt_community}
          type='text'
          placeholder='Leave a comment'
          value={commentDescription}
          onChange={(e) => setCommentDescription(e.target.value)}
        />
        <div className={styles.interet_btnInner}>
          <button
            onClick={() => cancelComment()}
            className={`${styles.btn_draft} ${styles.btn_create}`}
          >
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
                <button
                  onClick={handleShowEditContainer}
                  className={styles.edit_icon2}
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
              {session?.user?._id === post?.user?.id && showEditContainer && (
                <div className={styles.edit_container}>
                  <button
                    onClick={() => handleEditComment(post?._id, post?.content)}
                    className={styles.btn_edit_button}
                  >
                    <AiOutlineEdit size={24} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you wish to delete this comment?'
                        )
                      )
                        handleDeleteComment(post._id);
                    }}
                    className={styles.btn_edit_button}
                  >
                    <AiOutlineDelete size={24} />
                    Delete
                  </button>
                </div>
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
                <button
                  onClick={() =>
                    toggleReplyModal(
                      state?.repliedCommentData?.comments,
                      post._id
                    )
                  }
                  className={styles.show_replies}
                >
                  <AiOutlineArrowDown size={12} />
                  Show all replies{' '}
                  {numberOfReplies(
                    state?.repliedCommentData?.comments,
                    post._id
                  )}
                </button>
                <button
                  // onClick={() => replyComment(post._id)}
                  onClick={() => {
                    toggleModal();
                    window.sessionStorage.setItem(
                      'commentId',
                      JSON.stringify(post._id)
                    );
                  }}
                  className={styles.reply}
                >
                  <BsArrowReturnRight size={12} />
                  Reply
                </button>
              </div>
            </div>
            <div
              className={
                showReplyModel
                  ? styles.comment_container2
                  : styles.hide_comment_container2
              }
            >
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
                          <button
                            onClick={handleShowEditReplyDropdwon}
                            className={styles.edit_icon2}
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
                        {session?.user?._id === com?.user?.id &&
                          showEditReplyDropDown && (
                            <div className={styles.edit_container}>
                              <button
                                onClick={() =>
                                  handleEditReplyComment(
                                    com?._id,
                                    com?.content,
                                    com?.user?.username
                                  )
                                }
                                className={styles.btn_edit_button}
                              >
                                <AiOutlineEdit size={24} />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      'Are you sure you wish to delete this comment?'
                                    )
                                  )
                                    handleDeleteRepliedComment(com._id);
                                }}
                                className={styles.btn_edit_button}
                              >
                                <AiOutlineDelete size={24} />
                                Delete
                              </button>
                            </div>
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
                          <button></button>
                          <button
                            // onClick={() => replyComment(post._id)}
                            // onClick={() => toggleReplyModal()}
                            onClick={() =>
                              handleReplyComment(post._id, com?.user?.username)
                            }
                            className={styles.reply}
                          >
                            <BsArrowReturnRight size={12} />
                            Reply
                          </button>
                        </div>
                      </div>
                      {showModal && <CommentModal closeModal={toggleModal} />}
                    </div>
                  )
                );
              })}
            </div>
          </div>
        );
      })}
      {showEditCommentModal && (
        <EditComment
          closeModal={toggleModalEditPost}
          closeDropDown={handleShowEditReplyDropdwon}
        />
      )}

      {showReplyEditCommentModal && (
        <EditRepliedComment
          closeModal={toggleModalReplyEditPost}
          closeDropDown={handleShowEditReplyDropdwon}
        />
      )}
      {showModal && <CommentModal closeModal={toggleModal} />}
    </div>
  );
};

export default Comment;
