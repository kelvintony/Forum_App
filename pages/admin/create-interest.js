import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/CreateInterest.module.css';
import cancelIcon from '../../assets/single_community/cancel_icon.svg';
import Router, { useRouter } from 'next/router';
import axios from 'axios';

import { getSession, useSession } from 'next-auth/react';
import LeftSideBar from '../../components/leftSideBar/LeftSideBar';

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   // console.log('from session', session.user.isAdmin);
//   if (!session?.user?.isAdmin) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

const Createinterest = (props) => {
  console.log('from interest');
  const router = useRouter();

  const { status, data: session } = useSession();

  const { redirect } = router.query;

  const effectRan = useRef(false);

  const [loading, setLoading] = useState(false);

  const [interestData, setInterestData] = useState({
    interestName: '',
    description: '',
  });

  const handleSubmit = async () => {
    const { interestName, description } = interestData;

    // console.log(postData);
    setLoading(true);
    await axios
      .post(`/api/admin/interest`, {
        interestName,
        description,
      })
      .then(function (response) {
        if (response) {
          setLoading(false);
          console.log(response);
          router.push('/admin/interest');
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  if (session?.user.hasOwnProperty('isAdmin') === false) {
    return null;
  }

  return (
    <div className={styles.interest_container}>
      <div className={styles.hide_leftSideBar}>
        <LeftSideBar />
      </div>
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
            value={interestData.interestName}
            className={styles.txt_community}
            type='text'
            placeholder='enter interest name'
            onChange={(e) =>
              setInterestData({ ...interestData, interestName: e.target.value })
            }
          />
        </div>

        <div className={styles.interest_name}>
          <p>Description</p>
          <input
            className={styles.txt_community}
            value={interestData.description}
            type='text'
            placeholder='enter interest description'
            onChange={(e) =>
              setInterestData({ ...interestData, description: e.target.value })
            }
          />
        </div>

        <div className={styles.interest_buttons}>
          <button onClick={() => router.back()} className={styles.btn_cancel}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.btn_create}>
            {loading ? 'Creating...' : 'Create interest'}
          </button>
        </div>
      </div>
    </div>
  );
};

Createinterest.auth = { adminOnly: true };
export default Createinterest;
