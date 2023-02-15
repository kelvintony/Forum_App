import React from 'react';
import UserTab from '../components/UserTab/UserTab';
import styles from '../styles/UserTab.module.css';

const UserSettings = () => {
  return (
    <div className={styles.userTab_container}>
      <h3>User Settings</h3>
      <UserTab />
    </div>
  );
};

export default UserSettings;
