import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import SiginLoader from '../components/SigninLoader/SiginLoader';

import { signIn, getSession, useSession } from 'next-auth/react';

import styles from '../styles/Signup.module.css';
import Image from 'next/image';
import registerPix from '../assets/register_pix.png';
import Navbar from '../components/Navbar/Navbar';
import LeftSideBar from '../components/leftSideBar/LeftSideBar';
import { authConstants } from '../context/constants';
import { useStore } from '../context';

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   // console.log('from session',session)
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

// style={{cursor:loading&&'progress'}}
const Signup = () => {
  const router = useRouter();

  // const { pathname, asPath } = router;

  // const {redirect}= router.query

  const [user, setUser] = useState(null);

  const [state, dispatch] = useStore();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [formDataError, setFormDataError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadComponent, setLoadComponent] = useState(true);

  useEffect(() => {
    setLoadComponent(false);
    if (state?.user?.username) {
      router.push('/');
    }
  }, []);

  //toggle menu section
  const toggle = () => {
    dispatch({
      type: authConstants.TOGGLE,
    });
  };

  const submitFormData = async () => {
    if (
      formData.username.length === 0 ||
      formData.email.length === 0 ||
      formData.password.length === 0 ||
      formData.confirmPassword.length === 0
    ) {
      setFormDataError(true);
    }

    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage('passwords must match');
      // return alert('passwords must match');
    }

    if (
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      setLoading(true);
      await axios
        .post('https://reddit-forum-api.vercel.app/user/signup', formData)
        .then((res) => {
          if (res) {
            // localStorage.setItem('profile', JSON.stringify(res.data));
            setLoading(false);
            setResponseMessage(res.data.message);
            // navigate('/');
            // console.log(res);
          }
        })
        .catch((err) => {
          // alert('Email already exist');
          setLoading(false);
          setErrorMessage(err?.response?.data?.message);
        });
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
          {responseMessage ? (
            <h3 className={styles.container_a}>{responseMessage}</h3>
          ) : (
            <div className={styles.container_a}>
              <h3>
                Join The <br /> Community
              </h3>
              <p className={styles.container_p}>
                Create your Member profile and get first access to the very best
                topic and community.
              </p>

              {errorMessage && (
                <p className={styles.errorMessageContainer}>{errorMessage}</p>
              )}

              <label htmlFor='username'>
                Username: <br />
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <br />
                {formDataError && formData.username.length <= 0 ? (
                  <span style={{ color: 'red' }}>* required</span>
                ) : (
                  ''
                )}
              </label>

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

              <label htmlFor='confirmPassword'>
                Confirm Password: <br />
                <input
                  type='password'
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <br />
                {formDataError && formData.confirmPassword.length <= 0 ? (
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
                {loading ? <SiginLoader /> : 'Register'}
              </button>
              <Link href='/signin' className={styles.already_signup}>
                Already have an account? <span>Sign in</span>
              </Link>
            </div>
          )}
          <div className={styles.container_b}>
            <Image
              className={styles.regster_logo}
              src={registerPix}
              alt='pix-c'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
