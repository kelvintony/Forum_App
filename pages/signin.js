import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import SiginLoader from '../components/SigninLoader/SiginLoader';
import { signIn, getSession, useSession } from 'next-auth/react';

import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import loginPix from '../assets/login_pix.png';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';

import { useStore } from '../context';
import { authConstants } from '../context/constants';

// export async function getStaticProps(context) {
//   const session = await getSession(context);
//   console.log('from session', session);
//   if (session?.user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     };
//   }

//   return {
//     props: { session },
//     // revalidate: 5,
//   };
// }

const Signin = () => {
  const router = useRouter();

  // const { pathname, asPath } = router;

  // const { redirect } = router.query;

  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadComponent, setLoadComponent] = useState(true);

  const [state, dispatch] = useStore();

  useEffect(() => {
    setLoadComponent(false);
    if (state?.user?.username) {
      router.push('/');
    }
  }, []);

  // console.log('from signin', state.user);

  const toggle = () => {
    dispatch({
      type: authConstants.TOGGLE,
    });
  };

  const submitFormData = async () => {
    if (formData.email.length === 0 || formData.password.length === 0) {
      setFormDataError(true);
    }

    if (formData.email && formData.password) {
      setLoading(true);
      dispatch({
        type: authConstants.LOGIN_REQUEST,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      try {
        if (result.ok) {
          setLoading(false);
          //for the context
          const otherSession = await getSession();
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: otherSession,
          });
          router.replace('/');
        } else {
          setLoading(false);
          //for the context
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: result.error,
          });
          setErrorMessage(result.error);
        }
      } catch (error) {
        setLoading(false);
        // dispatch({
        //   type: authConstants.LOGIN_FAILURE,
        //   payload: result.error,
        // });
        console.log(error);
      }
    }
  };

  // if (state?.user?.username) {
  //   Router.replace('/');
  //   return null;
  // }

  // if (loadComponent) {
  //   return null;
  // }

  const { status, data: session } = useSession();

  if (status === 'loading') {
    return <p>Loading</p>;
  }
  if (session) {
    router.push('/');
    return null;
  }

  return (
    <div>
      {/* <Navbar openMenu={toggle} /> */}
      {state.harmburger && <LeftSideBar />}
      <section className={styles.register_container}>
        <div className={styles.register_inner_container}>
          <div className={styles.container_a}>
            <h3>We&apos;ve Missed You</h3>
            <p className={styles.container_p}>
              Kindly signin and get first access to the very best topic and
              community.
            </p>
            {errorMessage && (
              <p className={styles.errorMessageContainer}>{errorMessage}</p>
            )}
            <label htmlFor='email'>
              Email: <br />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <br />
              {formDataError && formData.email.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>

            <label htmlFor='password'>
              Password: <br />
              <input
                type='password'
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <br />
              {formDataError && formData.password.length <= 0 ? (
                <span style={{ color: 'red' }}>* required</span>
              ) : (
                ''
              )}
            </label>
            <button
              onClick={submitFormData}
              className={styles.btn_register_a}
              disabled={loading}
            >
              {loading ? <SiginLoader /> : 'Login'}
            </button>

            <Link href='/signup' className={styles.already_signup}>
              Forgot username or password?
            </Link>

            <Link href='/signup' className={styles.already_signup}>
              Don&apos;t have an account? <span>Sign up</span>
            </Link>
          </div>
          <div className={styles.container_b}>
            <Image className={styles.regster_logo} src={loginPix} alt='pix-c' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signin;
