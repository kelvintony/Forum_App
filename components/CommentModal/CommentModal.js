import React, { useState, useEffect } from 'react';
import styles2 from './CreatePostPop.module.css';

import { getSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

import sendPostIcon from '../../assets/sendPost_icon.svg';

import Head from 'next/head';
import Image from 'next/image';

import cancelIcon from '../../assets/single_community/cancel_icon.svg';

const CommentModal = (props) => {
  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { id } = router.query;

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    community: props?.community,
    image: '',
  });

  const [mobileMenu, setmobileMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };
  // console.log('from comment modal', props.commentId);
  const handleSubmit = async () => {
    // const { title, content, community, image } = postData;
    // setLoading(true);
    // await axios
    //   .post(`/api/post/create`, {
    //     title,
    //     content,
    //     community,
    //     image,
    //   })
    //   .then(function (response) {
    //     if (response) {
    //       setLoading(false);
    //       router.reload();
    //     }
    //   })
    //   .catch(function (error) {
    //     setLoading(false);
    //     console.log(error);
    //   });
  };
  return (
    <div className={styles2.post_wrapper}>
      <section className={styles2.rigtbar_section}>
        <div className={styles2.container_a}>
          <div className={styles2.header_title}>
            <h3>New Post</h3>
            <button onClick={() => props.closeModal()}>
              <Image src={cancelIcon} alt='cancel_pix' />
            </button>
          </div>

          <div className={styles2.interest_name}>
            <p>Leave a comment</p>
            <input
              className={styles2.txt_community}
              type='text'
              placeholder='enter post title'
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
          </div>

          <div className={styles2.interest_buttons}>
            <input className={styles2.hidden_input} />

            <div className={styles2.interet_btnInner}>
              <button
                onClick={() => props.closeModal()}
                className={`${styles2.btn_draft} ${styles2.btn_create}`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`${styles2.btn_image} ${styles2.btn_create}`}
              >
                <Image src={sendPostIcon} alt='create_pix' />
                'Post'
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommentModal;
