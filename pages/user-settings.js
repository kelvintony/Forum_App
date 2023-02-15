import React from 'react';
import UserTab from '../components/UserTab/UserTab';
import styles from '../styles/UserTab.module.css';

import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log('from session',session)
  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: { session },
  };
}

const UserSettings = () => {
  return (
    <div className={styles.userTab_container}>
      <h3>User Settings</h3>
      <UserTab />
    </div>
  );
};

export default UserSettings;
