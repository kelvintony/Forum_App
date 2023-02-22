import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LeftSideBar.module.css';

import { useRouter } from 'next/router';
import searchIcon from '../../assets/home-page/search-icon.svg';
import menuIcon from '../../assets/home-page/menu-icon.svg';
import dcIcon from '../../assets/home-page/dc-icon.svg';
import gdcIcon from '../../assets/home-page/gdc-icon.svg';
import fcIcon from '../../assets/home-page/fc-icon.svg';
import javaIcon from '../../assets/home-page/java-icon.svg';
import bitcoinIcon from '../../assets/home-page/bitcoin-icon.svg';
import designIcon from '../../assets/home-page/design-icon.svg';
import tutorialIcon from '../../assets/home-page/tutorial-icon.svg';
import businessIcon from '../../assets/home-page/business-icon.svg';

import { GrFormClose } from 'react-icons/gr';
import { IoLogoFoursquare } from 'react-icons/io';
import { useStore } from '../../context';
import { authConstants } from '../../context/constants';
import axios from 'axios';

const LeftSideBar = (props) => {
  const router = useRouter();

  const [state, dispatch] = useStore();

  const navigateToSingleCommunity = () => {
    router.push('/single-community');
  };

  const navigateCommunityList = () => {
    router.push('/community-list');
  };

  // console.log(
  //   'from sidebar single',
  //   state?.forumData[0]?.data[0].communityName
  // );
  console.log(state?.forumData[0]?.data);

  // const [communityData, setCommunityData] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     setLoading(true);
  //     await axios
  //       .get(`/api/community`)
  //       .then((res) => {
  //         setCommunityData(res.data);
  //         // console.log(res.data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log('');
  //       });
  //   };
  //   getPosts();
  // }, []);
  return (
    <>
      <section className={styles.leftbar_section}>
        <div className={styles.navbarSearch}>
          <Image width={11} height={11} src={searchIcon} alt='searchPix' />
          <input type='text' name='' id='' placeholder='Global search' />
        </div>
        {/* <a className={styles.menu} href=''>
					<Image width={18} height={18} src={menuIcon} alt='menuPix' />Menu
				</a> */}
        <br />
        <a className={styles.forum} href=''>
          Forum Page
        </a>
        <div className={styles.popular_community}>
          <h4>POPULAR COMMUNITIES</h4>
          {state?.forumData[0]?.data.slice(0, 4).map((value) => {
            return (
              <div
                key={value._id}
                onClick={navigateToSingleCommunity}
                className={styles.community_container}
              >
                <Image width={28} height={28} src={dcIcon} alt='comunityPix' />
                <div className={styles.community_inner}>
                  <a>{value.communityName}</a>
                  <a>Find the latest Update</a>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`${styles.popular_community} ${styles.interestCommunity}`}
        >
          <h4 className={styles.interest_community_heading}>INTEREST</h4>
          {state?.forumData[1]?.data?.map((value) => {
            return (
              <div
                onClick={navigateCommunityList}
                className={`${styles.community_container}  ${styles.fixed_position}`}
              >
                <Image
                  width={28}
                  height={28}
                  src={javaIcon}
                  alt='comunityPix'
                />
                <div className={styles.community_inner}>
                  <a># {value?.interestName}</a>
                  <a>82,645 Communities &middot Trending</a>
                </div>
              </div>
            );
          })}

          {/* <div
            onClick={navigateCommunityList}
            className={styles.community_container}
          >
            <Image width={28} height={28} src={bitcoinIcon} alt='comunityPix' />
            <div className={styles.community_inner}>
              <a>#bitcoin</a>
              <a>82,645 Communities &middot Trending</a>
            </div>
          </div>
          <div
            onClick={navigateToSingleCommunity}
            className={styles.community_container}
          >
            <Image width={28} height={28} src={designIcon} alt='comunityPix' />
            <div className={styles.community_inner}>
              <a>#design</a>
              <a>82,645 Communities &middot Trending</a>
            </div>
          </div>
          <div
            onClick={navigateCommunityList}
            className={styles.community_container}
          >
            <Image
              width={28}
              height={28}
              src={tutorialIcon}
              alt='comunityPix'
            />
            <div className={styles.community_inner}>
              <a>#tutorial</a>
              <a>82,645 Communities &middot Trending</a>
            </div>
          </div>
          <div
            onClick={navigateCommunityList}
            className={styles.community_container}
          >
            <Image
              width={28}
              height={28}
              src={businessIcon}
              alt='comunityPix'
            />
            <div className={styles.community_inner}>
              <a>#business</a>
              <a>82,645 Communities &middot Trending</a>
            </div>
          </div> */}
        </div>
        <div className={styles.lefttbar_about}>
          <a>About</a>
          <a>Privacy</a>
          <a>Terms</a>
        </div>
      </section>

      {state.harmburger && (
        <div className={styles.harmbuger_slide}>
          <section className={styles.leftbar_section}>
            <div className={styles.harmbuger_header}>
              <p>
                Forumix <IoLogoFoursquare color='#BE272A' size={25} />
              </p>
              <button
                className={styles.close_Button}
                onClick={() => {
                  dispatch({
                    type: authConstants.TOGGLE_HARMBUGGER,
                  });
                }}
              >
                <GrFormClose size={25} />
              </button>
            </div>
            <hr className={styles.harmburger_linethrough} />
            <div className={styles.search_container}>
              <div className={styles.navbarSearch}>
                <Image
                  width={11}
                  height={11}
                  src={searchIcon}
                  alt='searchPix'
                />
                <input type='text' name='' id='' placeholder='Global search' />
              </div>
            </div>

            <br />
            <div className={styles.forum_container}>
              <a className={styles.forum}>Forum Page</a>
            </div>
            <div className={styles.popular_community}>
              <h4>POPULAR COMMUNITIES</h4>
              {state?.forumData[0]?.data.map((value) => {
                return (
                  <div
                    onClick={navigateToSingleCommunity}
                    className={styles.community_container}
                  >
                    <Image
                      width={28}
                      height={28}
                      src={dcIcon}
                      alt='comunityPix'
                    />
                    <div className={styles.community_inner}>
                      <a>{value.communityName}</a>
                      <a>Find the latest Update</a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className={`${styles.popular_community} ${styles.interestCommunity}`}
            >
              <h4 className={styles.interest_community_heading}>INTEREST</h4>
              <div
                onClick={navigateCommunityList}
                className={`${styles.community_container}  ${styles.fixed_position}`}
              >
                <Image
                  width={28}
                  height={28}
                  src={javaIcon}
                  alt='comunityPix'
                />
                <div className={styles.community_inner}>
                  <a>#javascript</a>
                  <a>82,645 Communities &middot Trending</a>
                </div>
              </div>
              <div
                onClick={navigateCommunityList}
                className={styles.community_container}
              >
                <Image
                  width={28}
                  height={28}
                  src={bitcoinIcon}
                  alt='comunityPix'
                />
                <div className={styles.community_inner}>
                  <a>#bitcoin</a>
                  <a>82,645 Communities &middot Trending</a>
                </div>
              </div>
              <div
                onClick={navigateCommunityList}
                className={styles.community_container}
              >
                <Image
                  width={28}
                  height={28}
                  src={designIcon}
                  alt='comunityPix'
                />
                <div className={styles.community_inner}>
                  <a>#design</a>
                  <a>82,645 Communities &middot Trending</a>
                </div>
              </div>
              <div
                onClick={navigateCommunityList}
                className={styles.community_container}
              >
                <Image
                  width={28}
                  height={28}
                  src={tutorialIcon}
                  alt='comunityPix'
                />
                <div className={styles.community_inner}>
                  <a>#tutorial</a>
                  <a>82,645 Communities &middot Trending</a>
                </div>
              </div>
              <div
                onClick={navigateCommunityList}
                className={styles.community_container}
              >
                <Image
                  width={28}
                  height={28}
                  src={businessIcon}
                  alt='comunityPix'
                />
                <div className={styles.community_inner}>
                  <a>#business</a>
                  <a>82,645 Communities &middot Trending</a>
                </div>
              </div>
            </div>
            <div className={styles.lefttbar_about}>
              <a>About</a>
              <a>Privacy</a>
              <a>Terms</a>
            </div>
          </section>
          <div
            className={styles.overlay}
            onClick={() => {
              dispatch({
                type: authConstants.TOGGLE_HARMBUGGER,
              });
            }}
          ></div>
        </div>
      )}
    </>
  );
};

export default LeftSideBar;
