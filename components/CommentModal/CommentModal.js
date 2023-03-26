import React, { useState, useEffect, useRef } from 'react';
import styles2 from './CreatePostPop.module.css';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

import sendPostIcon from '../../assets/sendPost_icon.svg';

import Head from 'next/head';
import Image from 'next/image';

import cancelIcon from '../../assets/single_community/cancel_icon.svg';
import { authConstants } from '../../context/constants';
import { useStore } from '../../context';

const CommentModal = (props) => {
  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { id } = router.query;

  const { status, data: session } = useSession();

  // console.log(session.user.username);

  const ref = useRef(null);

  const [postData, setPostData] = useState({
    content: '',
  });

  const [mobileMenu, setmobileMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useStore();

  const [error, setError] = useState(false);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };

  const createRepliedComment = async () => {
    let commentId = JSON.parse(window.sessionStorage.getItem('commentId'));
    let commentUsername = JSON.parse(
      window.sessionStorage.getItem('commentUsername')
    );
    setLoading(true);
    try {
      const res = await axios.post(`/api/comment/replycomment`, {
        commentId: commentId,
        postId: id,
        content:
          session.user.username === commentUsername
            ? postData.content
            : !commentUsername
            ? postData.content
            : '@' + commentUsername + ', ' + postData.content,
      });
      if (res) {
        setLoading(false);
        dispatch({
          type: authConstants.CREATE_REPLIED_COMMENT,
          payload: res.data,
        });
        window.sessionStorage.removeItem('commentId');
        props.closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles2.post_wrapper}>
      <section className={styles2.rigtbar_section}>
        <div className={styles2.container_a}>
          <div className={styles2.interest_name}>
            <p>Reply comment</p>
            <div className={styles2.input_container}>
              {session.user.username ===
              JSON.parse(window.sessionStorage.getItem('commentUsername'))
                ? ''
                : !JSON.parse(window.sessionStorage.getItem('commentUsername'))
                ? ''
                : '@' +
                  JSON.parse(window.sessionStorage.getItem('commentUsername')) +
                  ', '}
              <input
                className={styles2.txt_community}
                type='text'
                ref={ref}
                value={postData.content}
                onChange={(e) =>
                  setPostData({ ...postData, content: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles2.interest_buttons}>
            <div className={styles2.interet_btnInner}>
              <button
                onClick={() => {
                  props.closeModal();
                  window.sessionStorage.removeItem('commentId');
                  window.sessionStorage.removeItem('commentUsername');
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
                Comment
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommentModal;
