import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.css';
import Link from 'next/link';

import Image from 'next/image';

import startIcon from '../../assets/home-page/start-icon.svg';
import topCommunityIcon from '../../assets/home-page/topCommunity-icon.svg';
import quickLinksIcon from '../../assets/home-page/quickLinks-icon.svg';
import profile_pix from '../../assets/profile_builb.png';
import profile_image22 from '../../assets/profile_image22.png';
import profile_image23 from '../../assets/avatar.jpg';
import profile_image24 from '../../assets/avatar2.png';
import award from '../../assets/award.png';

import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';

import { AiOutlineInstagram } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
import { AiOutlineFacebook } from 'react-icons/ai';

import { BiEdit } from 'react-icons/bi';
import axios from 'axios';

import { signOut, signIn, getSession, useSession } from 'next-auth/react';
import { useStore } from '../../context';
import { useRouter } from 'next/router';

const ProfileCard = ({ community }) => {
  const { status, data: session } = useSession();

  const [state, dispatch] = useStore();

  const [userProfile, setUserProfile] = useState('');

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { asPath, pathname } = useRouter();

  const { id } = router.query;

  const [communityListTopHealth, setCommunityTopHealth] = useState([]);

  const [communityListTopSport, setCommunityTopSport] = useState([]);

  useEffect(() => {
    setCommunityTopHealth(
      state?.forumData[0]?.data.filter((data) => {
        return data?.interest === 'Food And Nutrition';
      })
    );

    setCommunityTopSport(
      state?.forumData[0]?.data.filter((data) => {
        return data?.interest === 'Football';
      })
    );
  }, [state, pathname]);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      await axios
        .get(`/api/user/profile/${id}`)
        .then((res) => {
          setUserProfile(res.data);

          setLoading(false);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserProfile();
  }, []);
  return (
    <div className={styles.rigtbar_section_b}>
      {/* first section  */}
      <div className={`${styles.right_sidebar} ${styles.right_sidebarTop}`}>
        <div className={styles.profile_container}>
          <Image
            className={styles.profile_image1}
            src={profile_image22}
            // src={profile_image23}
            alt='pix_1'
          />
          <div className={styles.biodata_container}>
            <div className={styles.bio_data}>
              <p>{userProfile?.displayName}</p>
              <p className={styles.profile_name}>
                &#64; {userProfile?.username}
              </p>
            </div>
          </div>

          <p className={styles.about_me}>{userProfile?.about}</p>

          <div className={styles.profile_divider}></div>
          <div className={styles.profile_award}>
            <Image
              className={styles.profile_award_image}
              src={award}
              alt='pix_1'
            />
            <p>125</p>
            <p> &#91; 8 &#93; </p>
          </div>
          <div className={styles.profile_divider}></div>
          <div className={styles.profile_icons}>
            <a
              href={userProfile?.instagramUrl || '#'}
              className={styles.profile_icons_image}
            >
              <AiOutlineInstagram size={30} />
            </a>
            <a
              href={userProfile?.twitterUrl || '#'}
              className={styles.profile_icons_image}
            >
              <FiTwitter size={30} />
            </a>
            <a
              href={userProfile?.facebookUrl || '#'}
              className={styles.profile_icons_image}
            >
              <AiOutlineFacebook size={30} />
            </a>
          </div>
          <div className={styles.btn_container}>
            <button className={styles.btn_chat}>Chat</button>
            <button className={styles.btn_register}>Follow</button>
          </div>
          <p className={styles.moreOptions}>More options</p>
        </div>
      </div>
      {/* second section  */}
      <div className={styles.right_sidebar}>
        <div className={styles.right_bar_inner}>
          <h4>
            <Image width={12} height={12} src={startIcon} alt='start_icon' />
            {userProfile?.username} Community
          </h4>

          {community.map((com) => {
            return (
              <div key={com._id} className={styles.right_bar_inner_a}>
                <Link href={`/single-community/${com._id}`}>
                  <Image
                    width={16}
                    height={16}
                    src={topCommunityIcon}
                    alt='top_community'
                  />{' '}
                  {com?.communityName} Communities
                </Link>{' '}
                <br />
                <a className={styles.join_community} href=''>
                  Join Community
                </a>
              </div>
            );
          })}
          {community.length === 0 && (
            <p style={{ fontSize: '11px' }}>You do not have any community</p>
          )}
          {/* {community.length > 0 ? <p>25</p> : <p>You have no communities</p>} */}
          <a className={styles.btn_see_all_communities}>See All Communities</a>
        </div>
      </div>

      {/* Third Section */}
      <div className={styles.right_sidebar}>
        <div className={styles.right_bar_inner}>
          <h4>
            <Image width={12} height={12} src={startIcon} alt='start_icon' />
            Top Sport Communities
          </h4>
          {communityListTopSport?.slice(0, 3)?.map((value) => {
            return (
              <div key={value._id} className={styles.right_bar_inner_a}>
                {communityListTopSport && (
                  <Link href={`/single-community/${value?._id}`}>
                    <Image
                      width={16}
                      height={16}
                      src={topCommunityIcon}
                      alt='top_community'
                    />{' '}
                    {communityListTopSport && value?.communityName} Community
                  </Link>
                )}
                <br />
                <Link
                  href={`/single-community/${value?._id}`}
                  className={styles.join_community}
                >
                  Join Community
                </Link>
              </div>
            );
          })}

          <a className={styles.btn_see_all_communities}>See All Communities</a>
        </div>

        <div className={styles.right_bar_inner}>
          <h4>
            <Image width={12} height={12} src={startIcon} alt='start_icon' />
            Top Health Communities
          </h4>
          {communityListTopHealth?.slice(0, 3).map((value) => {
            return (
              <div key={value._id} className={styles.right_bar_inner_a}>
                {communityListTopHealth && (
                  <Link href={`/single-community/${value?._id}`}>
                    <Image
                      width={16}
                      height={16}
                      src={topCommunityIcon}
                      alt='top_community'
                    />{' '}
                    {communityListTopHealth && value?.communityName} Community
                  </Link>
                )}
                <br />
                <Link
                  className={styles.join_community}
                  href={`/single-community/${value?._id}`}
                >
                  Join Community
                </Link>
              </div>
            );
          })}

          <a className={styles.btn_see_all_communities}>See All Communities</a>
        </div>
      </div>

      {/* Fourth section  */}
      <div className={styles.right_sidebar_must_read}>
        <div className={styles.must_read_inner}>
          <h4>
            <Image width={12} height={12} src={startIcon} alt='start_icon' />
            Must Read
          </h4>
          <ul className={styles.post_of_moment}>
            <li>
              <a href=''>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </a>
            </li>
            <li>
              <a href=''>
                Lorem ipsum dolor sit amet, consectetur adipisicing.
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.must_read_inner}>
          <h4>
            <Image
              width={12}
              height={12}
              src={quickLinksIcon}
              alt='start_icon'
            />
            Quick Links
          </h4>
          <ul className={styles.post_of_moment}>
            <li>
              <a href=''>Alemhelp source-code on GitHub</a>
            </li>
            <li>
              <a href=''>Golang best-practices</a>
            </li>
            <li>
              <a href=''>Alem.School dashboard</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
