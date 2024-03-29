import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/CreateCommunity.module.css';
import styles2 from '../sections/CreatePost/CreatePost.module.css';
import cancelIcon from '../assets/single_community/cancel_icon.svg';
import axios from 'axios';

import { useRouter } from 'next/router';

const CreateCommunity = () => {
  const [firstClose, setfirstClose] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState('public');

  const [interests, setInterests] = useState([]);

  const [interestValue, setInterestValue] = useState('');

  const [communityName, setCommunityName] = useState('');

  const [image, setImage] = useState('');

  const [imageError, setImageError] = useState(false);

  const [error, setError] = useState(false);

  const [imageSize, setImageSize] = useState('Max image size 5mb');

  const router = useRouter();

  // console.log('from create-community');
  const showFirstClose = () => {
    setfirstClose(true);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const getInterest = async () => {
      setLoading(true);
      await axios
        .get(`/api/admin/interest`)
        .then((res) => {
          setInterests(res.data);
          setInterestValue(res.data[0].interestName);
          // console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    getInterest();
  }, []);
  // const cleearInput = () => {
  //   setFormData({
  //     name: '',
  //     email: '',
  //     title: '',
  //     message: '',
  //   });
  // };
  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage('');
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
    if (
      interestValue.length === 0 ||
      communityName.length === 0 ||
      image.length === 0
    ) {
      setError(true);
      setImageError(true);
      return;
    }
    // if (!image) {
    //   setImageSize('*Image is required');
    //   return;
    // }

    if (imageSize === '*Image size too large') {
      setImageSize('*Image size too large');
      return;
    }
    // console.log(postData);
    setLoading(true);
    await axios
      .post(`/api/community`, {
        interest: interestValue,
        communityName: communityName,
        communityType: selectedOption,
        image,
      })
      .then(function (response) {
        if (response) {
          setLoading(false);
          // window.localStorage.setItem('posts', JSON.stringify(response));
          // router.push('/');
          showFirstClose();
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className={styles.community_container}>
      <div className={!firstClose ? styles.container : styles.hide_container}>
        <div className={styles.inner_a}>
          <p>Create a Community</p>
          <button onClick={() => router.back()}>
            <Image src={cancelIcon} alt='cancel_pix' />
          </button>
        </div>
        <hr className={styles.comuunity_line} />
        <div className={styles.select_interest}>
          <p>Select Interest</p>
          <select
            onChange={(e) => setInterestValue(e.target.value)}
            value={interestValue}
            name={styles.interest}
            id=''
          >
            {interests.map((interest) => {
              return (
                <option key={interest?._id} value={interest?.interestName}>
                  {interest?.interestName}
                </option>
              );
            })}
          </select>
          {error && interestValue.length <= 0 ? (
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

        <div className={styles.community_name}>
          <p>Name</p>
          <p> Community name including capitalization cannot be changed</p>
          <input
            className={styles.txt_community}
            type='text'
            placeholder='enter community name'
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
          />
          <p> 21 Characters remaining</p>
          {error && communityName.length <= 0 ? (
            <label
              style={{
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Poppins',
              }}
            >
              *name is required
            </label>
          ) : (
            ''
          )}
        </div>

        <div className={styles.radio_communityType}>
          <p>Community Type</p>
          <input
            type='radio'
            id='radioPublic'
            name='communityType'
            value='public'
            checked={selectedOption === 'public'}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          <label htmlFor='radioPublic'>
            Public,{' '}
            <span className={styles.radion_inner}>
              Anyone can view, post, and comment to this community
            </span>
          </label>

          <input
            type='radio'
            id='radioRestricted'
            name='communityType'
            value='restricted'
            checked={selectedOption === 'restricted'}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          <label htmlFor='radioRestricted'>
            Restricted,
            <span className={styles.radion_inner}>
              Anyone can view, post, and comment to this community
            </span>
          </label>

          <input
            type='radio'
            id='radioPrivate'
            name='communityType'
            value='private'
            checked={selectedOption === 'private'}
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          />
          <label htmlFor='radioPrivate'>
            private,{' '}
            <span className={styles.radion_inner}>
              Anyone can view, post, and comment to this community
            </span>
          </label>
        </div>

        <div className={styles.upload_container}>
          <p>Upload cover image</p>
          {imageError && image.length <= 0 ? (
            <label
              style={{
                color: 'red',
                fontSize: '12px',
                fontFamily: 'Poppins',
                fontWeight: 'Bold',
              }}
            >
              *image is required
            </label>
          ) : (
            ''
          )}

          <span
            style={{
              fontSize: '12px',
              margin: '5px 0px',
              fontFamily: 'Poppins',
              color: imageSize === '*Image size too large' ? 'red' : '#0ECC8D',
              fontWeight: 'Bold',
              fontFamily: 'Poppins',
            }}
          >
            {imageSize}
          </span>

          <input
            className='custom-file-input'
            type='file'
            name='uploadFile'
            id='uploadFile'
            multiple
            onChange={uploadHandler}
          />
        </div>

        {image && (
          <div className={styles2.imageContainer}>
            {image && (
              <Image
                // unoptimized
                className={styles2.postImage}
                src={image}
                alt='post_image'
                fill
              />
            )}
          </div>
        )}

        <div className={styles.community_buttons}>
          <button onClick={() => router.back()} className={styles.btn_cancel}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.btn_create}>
            {loading ? 'Creating...' : 'Create Community'}
          </button>
        </div>
      </div>

      {/* this section is the section when the wants to create post after creating community  */}
      <div
        style={{
          marginTop: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className={
            firstClose ? styles.continue_container : styles.hide_container
          }
        >
          <div className={styles.inner_a}>
            <p>Create your first post</p>
            <button onClick={() => router.push('/')}>
              <Image src={cancelIcon} alt='cancel_pix' />
            </button>
          </div>
          <p className={styles.continue_text}>
            Lorem ipsum dolor sit amet consectetur. Amet eget sed porttitor nec
            morbi adipiscing consequat gravida gravida. Nunc rhoncus porta
            quisque nulla sit nullam. Libero tellus et elit molestie morbi
          </p>
          <div className={styles.community_buttons}>
            <button onClick={() => router.back()} className={styles.btn_cancel}>
              Cancel
            </button>
            <button
              onClick={() => router.push('/post/create-post')}
              className={styles.btn_create}
            >
              Create a post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
