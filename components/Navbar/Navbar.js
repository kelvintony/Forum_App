import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import profileImage from '../../assets/home-page/user-icon.svg';

import { useStore } from '../../context';

import { signOut, signIn, getSession, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';

import { MdNotificationsNone } from 'react-icons/md';
import { BiMessageRounded } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropup } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { IoLogoFoursquare } from 'react-icons/io';

import register_logo from '../../assets/user_plus.svg';
import menuIcon from '../../assets/home-page/menu-icon.svg';
import { authConstants } from '../../context/constants';

const Navbar = (props) => {
  const [showMenu, setshowMenu] = useState(false);

  const { status, data: session } = useSession();

  const [user, setUser] = useState('');

  const router = useRouter();

  const { pathname } = router;

  const [state, dispatch] = useStore();

  // console.log('from nav', state?.forumData);
  // console.log('from data', state?.forumData[0]?.data);

  const toggle = () => {
    dispatch({
      type: authConstants.TOGGLE,
    });
  };

  const logoutClickHandler = () => {
    window.localStorage.clear();
    Cookies.remove('next-auth.csrf-token');
    Cookies.remove('next-auth.session-token');
    signOut({ callbackUrl: '/' });
  };

  // if (status==='authenticated') {
  //   return null;
  // }
  // console.log('from nav', status);
  return (
    <nav className={styles.navbar_container}>
      <div className={styles.hamburger_container}>
        <button
          className={styles.hamburger_menu}
          onClick={() => {
            dispatch({
              type: authConstants.TOGGLE_HARMBUGGER,
            });
          }}
        >
          {' '}
          <Image src={menuIcon} width={30} height={30} alt='menu_icon' />
        </button>
        <Link href='/' className={styles.navbar_logo}>
          <p>
            Forumix <IoLogoFoursquare color='#BE272A' size={25} />{' '}
          </p>
          {/* <Image className={styles.logo_image} src={logo} alt='pix-a' /> */}
        </Link>
      </div>

      <div className={styles.navbar_btn}>
        {status === 'authenticated' && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {' '}
            {/* <h4 style={{ color: ' #04AA6D', fontSize: '12px' }}>{user?.result?.username}</h4>{' '} */}
            <Link href='/'>
              <MdNotificationsNone color='#808080' size={25} />
            </Link>
            <Link href='/'>
              <BiMessageRounded color='#808080' size={25} />
            </Link>
          </div>
        )}
        {status === 'authenticated' ||
          (status === 'unauthenticated' && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Link href='/signup' className={styles.btn_register}>
                <Image
                  className={styles.user_image}
                  src={register_logo}
                  alt='pix-b'
                />{' '}
                Register
              </Link>
              <Link href='/signin' className={styles.btn_login}>
                Login
              </Link>
            </div>
          ))}
        {state?.user?.username && (
          <div className={styles.profile_container}>
            <button onClick={toggle} className={styles.btn_profileImage}>
              {state?.user?.username &&
                state?.user?.username?.charAt(0).toUpperCase()}
              {/* <Image className={styles.profile_image} src={profileImage} alt='profile_pix' /> */}
            </button>
            <button
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={toggle}
            >
              {!state.mobileMenu ? (
                <IoMdArrowDropdown size={25} />
              ) : (
                <IoMdArrowDropup size={25} />
              )}
            </button>
          </div>
        )}

        {state?.user?.username && (
          <div
            className={
              state.mobileMenu
                ? styles.profile_dropdown
                : styles.close_profileMenu
            }
          >
            <ul>
              <li>
                <h3 className={styles.profile_Name}>{state?.user?.username}</h3>
                <span className={styles.proile_userName}>
                  @{state.user?.username}
                </span>
              </li>
              <hr />
              <li onClick={toggle} className={styles.profileItems}>
                <Link style={{ display: 'block' }} href='/'>
                  Dashboard
                </Link>
              </li>
              <li onClick={toggle} className={styles.profileItems}>
                <Link style={{ display: 'block' }} href='/post/create-post'>
                  Write a post
                </Link>
              </li>
              <li onClick={toggle} className={styles.profileItems}>
                <Link style={{ display: 'block' }} href='/create-community'>
                  Create a community
                </Link>
              </li>
              <li onClick={toggle} className={styles.profileItems}>
                <Link style={{ display: 'block' }} href='/moderate-post'>
                  Moderate Post
                </Link>
              </li>

              {state?.user?.isAdmin && (
                <li onClick={toggle} className={styles.profileItems}>
                  <Link
                    style={{ display: 'block' }}
                    href='/admin/create-interest'
                  >
                    Create an interest
                  </Link>
                </li>
              )}
              {state?.user?.isAdmin && (
                <li onClick={toggle} className={styles.profileItems}>
                  <Link style={{ display: 'block' }} href='/admin/interest'>
                    View Interest
                  </Link>
                </li>
              )}
              <li onClick={toggle} className={styles.profileItems}>
                <Link style={{ display: 'block' }} href='/profile'>
                  Profile
                </Link>
              </li>
              <li onClick={toggle} className={styles.profileItems}>
                <Link style={{ display: 'block' }} href='/user-settings'>
                  Settings
                </Link>
              </li>
              <hr />
              <li onClick={logoutClickHandler} className={styles.profileItems}>
                <button className={styles.user_logout}>
                  <FiLogOut size={13} />
                  Logout
                </button>
              </li>
              {/* <li onClick={logoutUser} className={styles.btn_register}>
							<Link  href='/'>Logout</Link>
						</li> */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
