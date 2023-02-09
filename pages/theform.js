import React from 'react';
import Multiform from '../components/FormComponent/multiform';
import styles from '../styles/MultiForm.module.css';

const theform = () => {
  return (
    <div className={styles.multiform_container}>
      <Multiform />
    </div>
  );
};

export default theform;
