import React, { useState, useEffect } from 'react';
import styles2 from '../../components/CommentModal/CreatePostPop.module.css';

import { getSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

import sendPostIcon from '../../assets/sendPost_icon.svg';

import Head from 'next/head';
import Image from 'next/image';

import cancelIcon from '../../assets/single_community/cancel_icon.svg';
import { useStore } from '../../context';
import { authConstants } from '../../context/constants';

const ReplyComment = (props) => {
  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const [state, dispatch] = useStore();

  const { commentId } = router.query;

  const [commentContent, setCommentContent] = useState('');

  const [mobileMenu, setmobileMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };
  // console.log('from comment modal', commentId);
  const createRepliedComment = async () => {
    let postId = JSON.parse(window.sessionStorage.getItem('postID'));
    setLoading(true);
    try {
      const res = await axios.post(`/api/comment/replycomment`, {
        commentId: commentId,
        postId,
        content: commentContent,
      });
      if (res) {
        setLoading(false);
        dispatch({
          type: authConstants.CREATE_REPLIED_COMMENT,
          payload: res.data,
        });
        window.sessionStorage.removeItem('postID');
        router.back();
      }
    } catch (err) {}
  };

  return (
    <div className={styles2.post_wrapper}>
      <section className={styles2.rigtbar_section}>
        <div className={styles2.container_a}>
          <div className={styles2.header_title}>
            <h3>New Post</h3>
            <button
              onClick={() => {
                router.back();
                window.sessionStorage.removeItem('postID');
              }}
            >
              <Image src={cancelIcon} alt='cancel_pix' />
            </button>
          </div>

          <div className={styles2.interest_name}>
            <p>Leave a comment</p>
            <input
              className={styles2.txt_community}
              type='text'
              placeholder='enter post title'
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
          </div>

          <div className={styles2.interest_buttons}>
            <input className={styles2.hidden_input} />

            <div className={styles2.interet_btnInner}>
              <button
                onClick={() => {
                  router.back();
                  window.sessionStorage.removeItem('postID');
                }}
                className={`${styles2.btn_draft} ${styles2.btn_create}`}
              >
                Cancel
              </button>
              <button
                onClick={createRepliedComment}
                className={`${styles2.btn_image} ${styles2.btn_create}`}
              >
                <Image src={sendPostIcon} alt='create_pix' />
                {loading ? 'Submitting' : 'Comment'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReplyComment;
