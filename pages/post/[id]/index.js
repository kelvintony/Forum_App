import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { getSession, useSession } from 'next-auth/react';
import Loader from '../../../components/Loader/Loader';

import styles2 from '../../../sections/CreatePost/CreatePost.module.css';
import styles from '../../../styles/EditPost.module.css';
import Image from 'next/image';

import sendPostIcon from '../../../assets/addImage_icon.svg';
import SiginLoader from '../../../components/SigninLoader/SiginLoader';
import { useStore } from '../../../context';
import { authConstants } from '../../../context/constants';
import LeftSideBar from '../../../components/leftSideBar/LeftSideBar';

// import styles3 from '../../../sections/CreatePost/CreatePost.module.css';

// import postModel from '../../../models/post';
// import db from '../../../utils/db';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: { session },
  };
  // const { params } = context;
  // const { id } = params;

  // await db.connect();
  // const post = await postModel.findOne({ _id: id });

  // const { updatedAt, ...others } = post._doc;
  // await db.disconnect();
  return {
    props: {
      session,
      // post: others ? JSON.parse(JSON.stringify(others)) : null,
    },
  };
}

const EditPost = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    community: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { id } = router.query;

  const [state, dispatch] = useStore();

  // const toggle = () => {
  //   dispatch({
  //     type: authConstants.TOGGLE,
  //   });
  //   // setmobileMenu(!mobileMenu);
  // };
  // console.log('from my state', state);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      await axios
        .get(`/api/post/${id}`)
        .then((res) => {
          setPostData({
            ...postData,
            title: res.data.title,
            content: res.data.content,
            community: res.data.community,
            image: res.data.image,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTasks();
  }, []);

  const handleSubmit = async (e) => {
    const { title, content, community, image } = postData;
    setLoading(true);
    e.preventDefault();
    await axios
      .put(`/api/post/${id}`, {
        title,
        content,
        community,
        image,
      })
      .then(function (response) {
        if (response) {
          setLoading(false);
          router.replace('/');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const simpleDiv = {
    height: '300px',
    width: '300px',
    paddingLeft: '90px',
  };

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // setImage(reader.result);
        setPostData({
          ...postData,
          image: reader.result,
        });
      };
    } else {
      // setImage('');
      setPostData({
        ...postData,
        image: '',
      });
    }
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  return (
    <div className={styles.editPost_container}>
      <div className={styles.hide_leftSideBar}>
        <LeftSideBar />
      </div>
      <div className={`${styles2.rigtbar_section_a}  ${styles2.addMargin}`}>
        <div className={styles2.container_a}>
          {loading ? (
            <div style={simpleDiv}>
              <Loader />
            </div>
          ) : (
            <div>
              <h3 style={{ marginBottom: '40px' }}>Edit Post</h3>

              <div className={styles2.interest_name}>
                <p>Post title</p>
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

              <div className={styles2.interest_name}>
                <p>Content</p>
                <textarea
                  placeholder='enter content'
                  className={styles2.txt_post}
                  name='enter_content'
                  onChange={(e) =>
                    setPostData({ ...postData, content: e.target.value })
                  }
                  value={postData.content}
                />
              </div>
              {/* <div className={styles2.upload_container}>
                <p>Upload cover image</p>
                <input
                  className='custom-file-input'
                  type='file'
                  name='uploadFile'
                  id='uploadFile'
                  multiple
                  onChange={uploadHandler}
                />
              </div> */}
              {postData.image && (
                <div className={styles2.imageContainer}>
                  {postData.image && (
                    <Image
                      // unoptimized
                      className={styles2.postImage}
                      src={postData.image}
                      alt='post_image'
                      fill
                    />
                  )}
                </div>
              )}

              <div className={styles2.interest_buttons}>
                <input
                  style={{ backgroundColor: 'unset', color: 'black' }}
                  type='file'
                  className={`${styles2.btn_image} ${styles2.btn_create}`}
                  name='uploadFile'
                  id='uploadFile'
                  multiple
                  onChange={uploadHandler}
                />
                <div className={styles2.interet_btnInner}>
                  <button
                    onClick={() => router.back()}
                    className={`${styles2.btn_draft} ${styles2.btn_create}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className={`${styles2.btn_image} ${styles2.btn_create}`}
                  >
                    {!loading && <Image src={sendPostIcon} alt='create_pix' />}
                    {loading ? <SiginLoader /> : 'Post'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPost;
