import React, { useState, useEffect } from 'react';
import styles2 from '../../sections/CreatePost/CreatePost.module.css';

import { getSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

// import loginPix from '../assets/login_pix.png';
import addImageIcon from '../../assets/addImage_icon.svg';
import sendPostIcon from '../../assets/sendPost_icon.svg';
import banner_image from '../../assets/single_community/banner_image.jpg';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import LeftSideBar from '../../components/leftSideBar/LeftSideBar';
import RightSideBar from '../../sections/home/RightSideBar';

import communityModel from '../../models/community';
import db from '../../utils/db';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log('from session',session)
  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }

  await db.connect();

  const community = await communityModel
    .find({ 'user.id': session?.user?._id })
    .sort({ _id: -1 })
    .lean();

  await db.disconnect();

  // console.log('community server', community);
  return {
    props: {
      session,
      myCommunity: community ? JSON.parse(JSON.stringify(community)) : null,
    },
  };
}

const Createpost = ({ session, myCommunity }) => {
  const router = useRouter();

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    community: '',
    image: '',
  });

  const [mobileMenu, setmobileMenu] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [imageSize, setImageSize] = useState('Max image size 5mb');

  // const [interests, setInterest] = useState(false);

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostData({
          ...postData,
          image: reader.result,
        });
      };
    } else {
      setPostData({
        ...postData,
        image: '',
      });
      setImageSize('No image was selected');
    }
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];

    if (file?.size / 1024 > 5120) {
      setImageSize('*Image size too large');
      return;
    }

    if (file?.size / 1024 < 5120) {
      setImageSize('Image is okay');
    }
    transformFile(file);

    const MIN_FILE_SIZE = 1024; // 1MB
    const MAX_FILE_SIZE = 5120; // 5MB
  };

  const handleSubmit = async () => {
    const { title, content, community, image } = postData;

    if (title.length === 0 || content.length === 0 || content.community === 0) {
      setError(true);
      return;
    }

    if (imageSize === '*Image size too large') {
      setImageSize('*Image size too large');
      return;
    }

    // console.log(postData);
    setLoading(true);
    await axios
      .post(`/api/post/create`, {
        title,
        content,
        community,
        image,
      })
      .then(function (response) {
        if (response) {
          setLoading(false);
          // window.localStorage.setItem('posts', JSON.stringify(response));
          router.push('/');
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div>
      {/* <Navbar openMenu={toggle} session={session} /> */}
      <LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />
      <section className={styles.rigtbar_section}>
        {/* <CreatePost /> */}
        <div className={styles2.rigtbar_section_a}>
          <div className={styles2.container_a}>
            <h3>New Post</h3>
            <div className={styles2.select_interest}>
              <p>Select community</p>
              <select
                name='interest'
                id=''
                value={postData.community}
                onChange={(e) =>
                  setPostData({ ...postData, community: e.target.value })
                }
              >
                <option>select a community</option>
                <option value='General'>General</option>

                {myCommunity.map((community) => {
                  return (
                    <option key={community._id} value={community.communityName}>
                      {community.communityName}
                    </option>
                  );
                })}
              </select>
              {error && postData.community.length <= 0 ? (
                <label
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    fontFamily: 'Poppins',
                  }}
                >
                  *required
                </label>
              ) : (
                ''
              )}
            </div>

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
              {error && postData.title.length <= 0 ? (
                <label
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    fontFamily: 'Poppins',
                  }}
                >
                  *required
                </label>
              ) : (
                ''
              )}
            </div>

            <div className={styles2.interest_name}>
              <p>Content</p>
              <textarea
                placeholder='enter content'
                className={styles2.txt_post}
                name='enter_content'
                value={postData.content}
                onChange={(e) =>
                  setPostData({ ...postData, content: e.target.value })
                }
              />
              {error && postData.content.length <= 0 ? (
                <label
                  style={{
                    color: 'red',
                    fontSize: '12px',
                    fontFamily: 'Poppins',
                  }}
                >
                  *required
                </label>
              ) : (
                ''
              )}
            </div>
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
            <span
              style={{
                fontSize: '12px',
                margin: '5px 0px',
                fontFamily: 'Poppins',
                color:
                  imageSize === '*Image size too large' ? 'red' : '#0ECC8D',
                fontWeight: 'Bold',
                fontFamily: 'Poppins',
              }}
            >
              {imageSize}
            </span>
            <div className={styles2.interest_buttons}>
              <input
                style={{ backgroundColor: 'unset', color: 'black' }}
                type='file'
                className={`${styles2.btn_image} ${styles2.btn_create}`}
                placeholder='choose file'
                multiple
                // onChange={uploadHandler}

                onChange={uploadHandler}
              />

              <div className={styles2.interet_btnInner}>
                <button
                  className={`${styles2.btn_draft} ${styles2.btn_create}`}
                >
                  Save as draft
                </button>
                <button
                  onClick={handleSubmit}
                  className={`${styles2.btn_image} ${styles2.btn_create}`}
                >
                  <Image src={sendPostIcon} alt='create_pix' />
                  {loading ? 'loading...' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <RightSideBar />
      </section>
    </div>
  );
};

export default Createpost;
