import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { useStore } from '../context';
import { authConstants } from '../context/constants';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [state, dispatch] = useStore();
  const router = useRouter();

  const { asPath, pathname } = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      let endpoints = ['/api/community', '/api/admin/interest', '/api/post'];
      dispatch({
        type: authConstants.FETCH_DATA_REQUEST,
      });
      // Return our response in the allData variable as an array
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then(
          axios.spread((...allData) => {
            dispatch({
              type: authConstants.FETCH_DATA_SUCCESS,
              payload: { ...allData },
            });
            // console.log({ ...allData });
          })
        )
        .catch(function (error) {
          dispatch({
            type: authConstants.FETCH_DATA_FALURE,
            payload: error,
          });
          console.log(error);
        });
    };
    getPosts();
    console.log('layout ran');
  }, [dispatch, router]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = state?.user?.authenticated;
      if (!authenticated) {
        // console.log('from Layout', authenticated);

        dispatch({ type: authConstants.LOGIN_REQUEST });
        const session = await getSession();
        if (session) {
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: session,
          });
        } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: session,
          });
        }
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
