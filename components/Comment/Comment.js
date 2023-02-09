import React from 'react';
import styles from './Comment.module.css';
import Image from 'next/image';
import sendPostIcon from '../../assets/sendPost_icon.svg';

const Comment = () => {
  return (
    <div className={styles.wrapper}>
      <h1>This is the comment section</h1>
      <div className={styles.comment_container}>
        <input
          className={styles.txt_community}
          type='text'
          placeholder='Leave a comment'
          // onChange={(e) =>
          //   setPostData({ ...postData, title: e.target.value })
          // }
        />
        <div className={styles.interet_btnInner}>
          <button className={`${styles.btn_draft} ${styles.btn_create}`}>
            Cancel
          </button>
          <button
            //   onClick={handleSubmit}
            className={`${styles.btn_image} ${styles.btn_create}`}
          >
            <Image src={sendPostIcon} alt='create_pix' />
            {/* {loading ? 'loading...' : 'Post'} */} Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
