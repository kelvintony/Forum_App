import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { useStore } from '../context';
import { authConstants } from '../context/constants';
import { getSession } from 'next-auth/react';

const Layout = ({ children }) => {
  const [state, dispatch] = useStore();

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
