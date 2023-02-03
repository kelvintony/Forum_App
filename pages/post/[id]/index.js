import React from 'react';
import { useRouter } from 'next/router';

import styles2 from '../../../sections/CreatePost/CreatePost.module.css';
import styles from '../../../styles/EditPost.module.css';
import Image from 'next/image';

import sendPostIcon from '../../../assets/addImage_icon.svg';

import postModel from '../../../models/post';
import db from '../../../utils/db';

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  await db.connect();
  const post = await postModel.findOne({ _id: id });

  const { _id, createdAt, updatedAt, ...others } = post._doc;
  //   console.log('from server post', post);
  console.log('from server others', others);
  await db.disconnect();
  return {
    props: {
      post: others ? JSON.parse(JSON.stringify(others)) : null,
    },
  };
}

const EditPost = (props) => {
  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { id } = router.query;

  console.log(props.post);
  console.log(id);
  return (
    <div className={styles.editPost_container}>
      <div className={'${styles2.rigtbar_section_a} ${addMargin}'}>
        <div className={styles2.container_a}>
          <h3>New Post</h3>
          <div className={styles2.select_interest}>
            <p>Select community</p>
            <select
              name='interest'
              id=''
              // onChange={(e) =>
              //   setPostData({ ...postData, community: e.target.value })
              // }
            >
              <option value='design'>lorem Design</option>
              <option value='javascript'>lorem Javascript</option>
              <option value='bitcoin'>lorem Bitcoin</option>
            </select>
          </div>

          <div className={styles2.interest_name}>
            <p>Post title</p>
            <input
              className={styles2.txt_community}
              type='text'
              placeholder='enter post title'
              // onChange={(e) =>
              //   setPostData({ ...postData, title: e.target.value })
              // }
            />
          </div>

          <div className={styles2.interest_name}>
            <p>Content</p>
            <textarea
              placeholder='enter content'
              className={styles2.txt_post}
              name='enter_content'
              onChange={(e) =>
                setPostData({ ...postData, content: e.target.value })
              }
            />
          </div>

          <div className={styles2.interest_buttons}>
            {/* <button className={`${styles.btn_image} ${styles.btn_create}`}>
						<Image src={addImageIcon} alt='create_pix' /> Add Image
					</button> */}
            <input
              style={{ backgroundColor: 'unset', color: 'black' }}
              type='file'
              className={`${styles2.btn_image} ${styles2.btn_create}`}
              placeholder='choose file'
            />
            <div className={styles2.interet_btnInner}>
              <button className={`${styles2.btn_draft} ${styles2.btn_create}`}>
                Save as draft
              </button>
              <button
                // onClick={handleSubmit}
                className={`${styles2.btn_image} ${styles2.btn_create}`}
              >
                <Image src={sendPostIcon} alt='create_pix' />
                {/* {loading ? "loading..." : "Post"} */} Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
