import React from 'react';
import Image from 'next/image';
import styles from '../../styles/CreateInterest.module.css';
import cancelIcon from '../../assets/single_community/cancel_icon.svg';
import { useRouter } from 'next/router';

import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log('from session', session.user.isAdmin);
  if (!session?.user?.isAdmin) {
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

const createinterest = ({ session }) => {
  const router = useRouter();
  return (
    <div className={styles.interest_container}>
      <div className={styles.container}>
        <div className={styles.inner_a}>
          <p>Create an Interest</p>
          <button onClick={() => router.back()}>
            {' '}
            <Image src={cancelIcon} alt='cancel_pix' />{' '}
          </button>
        </div>

        <hr className={styles.community_line} />

        <div className={styles.interest_name}>
          <p>Interest name</p>
          <input
            className={styles.txt_community}
            type='text'
            placeholder='enter interest name'
          />
        </div>

        <div className={styles.interest_name}>
          <p>Description</p>
          <input
            className={styles.txt_community}
            type='text'
            placeholder='enter interest description'
          />
        </div>

        <div className={styles.interest_buttons}>
          <button className={styles.btn_cancel}>Cancel</button>
          <button className={styles.btn_create}>Create interest</button>
        </div>
      </div>
    </div>
  );
};

export default createinterest;
