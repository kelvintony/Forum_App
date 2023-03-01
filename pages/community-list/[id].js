import React, { useEffect, useState } from 'react';
import styles from '../../styles/CommunityList.module.css';
import Image from 'next/image';

import LeftSideBar from '../../components/leftSideBar/LeftSideBar';
// import MainSection from '../sections/home/MainSection';
import RightSideBar from '../../sections/home/RightSideBar';

import trendingIcon from '../../assets/home-page/trending-icon.svg';
import post_icon from '../../assets/post_icon.svg';
import new_icon from '../../assets/home-page/new-icon.svg';
import animation_design_icon from '../../assets/animation_design_icon.svg';
import { useStore } from '../../context';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import interestModel from '../../models/interest';
import db from '../../utils/db';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { params } = context;
  const { id } = params;

  console.log(id);

  await db.connect();
  const interest = await interestModel.findOne({ _id: id });
  // console.log('from community sever', interest);

  await db.disconnect();
  return {
    props: {
      session,
      interest: interest ? JSON.parse(JSON.stringify(interest)) : null,
    },
  };
}
const Communitylist = ({ interest }) => {
  const router = useRouter();

  const { id } = router.query;

  const [mobileMenu, setmobileMenu] = useState(false);

  const [communityList, setCommunityList] = useState([]);

  const [state, dispatch] = useStore();

  useEffect(() => {
    setCommunityList(
      state?.forumData[0]?.data.filter((data) => {
        return data?.interest === interest?.interestName;
      })
    );
  }, [id, state, dispatch]);

  console.log('from community list');
  // console.log('from community list - community', state?.forumData[0]?.data);

  const toggle = () => {
    setmobileMenu(!mobileMenu);
  };

  const handleCommunityVisit = (id) => {
    router.push(`/single-community/${id}`);
  };

  return (
    <div>
      {/* <Navbar openMenu={toggle} /> */}
      <LeftSideBar burgerMenu={mobileMenu} closeMenu={toggle} />
      <section className={styles.rigtbar_section}>
        <div className={styles.rigtbar_section_a}>
          <button className={styles.btn_rightbar_trending}>
            <Image
              width={12}
              height={12}
              src={trendingIcon}
              alt='trending_icon'
            />{' '}
            Trending
          </button>
          <button className={styles.btn_rightbar_new}>
            <Image width={12} height={12} src={post_icon} alt='start_icon' />
            Post
          </button>
          <button className={styles.btn_rightbar_new}>
            <Image width={10} height={10} src={new_icon} alt='start_icon' />
            Related Topic
          </button>

          <div className={`${styles.post_card} ${styles.post_margin}`}>
            <p className={styles.post_card_heading}>
              Communities related to &apos; {interest?.interestName} &apos;
            </p>
          </div>
          {communityList?.map((theList) => {
            return (
              <div key={theList._id} className={styles.post_card}>
                <div className={styles.container_a}>
                  <Image
                    width={40}
                    height={40}
                    src={animation_design_icon}
                    alt='user_pix'
                  />
                  <div className={styles.inner_a}>
                    <p>{theList?.communityName} Community</p>
                    {/* <p>55k Members</p> */}
                    <p>{theList?.subscribers} Members</p>
                  </div>
                </div>
                <p>
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Consequat aliquet maecenas ut sit nulla */}
                </p>
                <div className={styles.inner_b}>
                  <div className={styles.inner_ba}>
                    <button
                      onClick={() => handleCommunityVisit(theList._id)}
                      className={styles.btn_post}
                    >
                      visit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {communityList?.length === 0 && (
            <h3 style={{ marginTop: '30px' }}>
              No Community available at the moment
            </h3>
          )}
        </div>
        <RightSideBar />
      </section>
    </div>
  );
};

export default Communitylist;
