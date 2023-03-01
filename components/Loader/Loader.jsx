import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  const simpleDiv = {
    // marginTop: '20px',
    height: '300px',
    width: '300px',
    paddingLeft: '90px',
  };

  return (
    <div style={simpleDiv}>
      <div className={styles.lds_default}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
