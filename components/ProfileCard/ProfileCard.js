import React from 'react';
import styles from './ProfileCard.module.css';
import Link from 'next/link';

import Image from 'next/image';

import startIcon from '../../assets/home-page/start-icon.svg';
import topCommunityIcon from '../../assets/home-page/topCommunity-icon.svg';
import quickLinksIcon from '../../assets/home-page/quickLinks-icon.svg';
import profile_pix from '../../assets/profile_builb.png';
import profile_image22 from '../../assets/profile_image22.png';
import award from '../../assets/award.png';

import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';

import { AiOutlineInstagram } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
import { AiOutlineFacebook } from 'react-icons/ai';

const ProfileCard = () => {
  return (
    <div className={styles.rigtbar_section_b}>
      {/* first section  */}
      <div className={`${styles.right_sidebar} ${styles.right_sidebarTop}`}>
        <div className={styles.profile_container}>
          <Image
            className={styles.profile_image1}
            src={profile_image22}
            alt='pix_1'
          />
          <p className={styles.profile_name}>&#64; Golanginya</p>
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
              href='https://facebook.com'
              className={styles.profile_icons_image}
            >
              <AiOutlineInstagram size={30} />
            </a>
            <a
              href='https://twitter.com'
              className={styles.profile_icons_image}
            >
              <FiTwitter size={30} />
            </a>
            <a
              href='https://instagram.com'
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
            Top Sport Communities
          </h4>
          <div className={styles.right_bar_inner_a}>
            <a href=''>
              <Image
                width={16}
                height={16}
                src={topCommunityIcon}
                alt='top_community'
              />{' '}
              Chelsea Football Communities
            </a>{' '}
            <br />
            <a className={styles.join_community} href=''>
              Join Community
            </a>
          </div>
          <div className={styles.right_bar_inner_a}>
            <a href=''>
              <Image
                width={16}
                height={16}
                src={topCommunityIcon}
                alt='top_community'
              />{' '}
              PH Vollyball communities
            </a>{' '}
            <br />
            <a className={styles.join_community} href=''>
              Join Community
            </a>
          </div>
          <a className={styles.btn_see_all_communities}>See All Communities</a>
        </div>
        <div className={styles.right_bar_inner}>
          <h4>
            <Image width={12} height={12} src={startIcon} alt='start_icon' />
            Top Design Communities
          </h4>
          <div className={styles.right_bar_inner_a}>
            <a href=''>
              <Image
                width={16}
                height={16}
                src={topCommunityIcon}
                alt='top_community'
              />{' '}
              Port Harcourt Design community
            </a>{' '}
            <br />
            <a className={styles.join_community} href=''>
              Join Community
            </a>
          </div>
          <div className={styles.right_bar_inner_a}>
            <a href=''>
              <Image
                width={16}
                height={16}
                src={topCommunityIcon}
                alt='top_community'
              />{' '}
              Figma Community
            </a>{' '}
            <br />
            <a className={styles.join_community} href=''>
              Join Community
            </a>
          </div>
          <a className={styles.btn_see_all_communities}>See All Communities</a>
        </div>
      </div>

      {/* Third section  */}
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
