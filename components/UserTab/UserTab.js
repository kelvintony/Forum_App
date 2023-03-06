import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from '../../styles/UserTab.module.css';
import axios from 'axios';

import { useSession } from 'next-auth/react';

export default function LabTabs() {
  const { status, data: session } = useSession();

  const [value, setValue] = useState('1');

  const [userProfile, setUserProfile] = useState({
    displayName: '',
    about: '',
    language: '',
    country: '',
    gender: '',
    image: '',
    twitterUrl: '',
    facebookUrl: '',
    instagramUrl: '',
  });

  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [formDataError, setFormDataError] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      await axios
        .get(`/api/user/profile/`)
        .then((res) => {
          setUserProfile({
            ...userProfile,
            displayName: res.data.displayName || '',
            about: res.data.about || '',
            language: res.data.language || '',
            country: res.data.country || '',
            gender: res.data.gender || '',
            image: res.data.image || '',
            facebookUrl: res.data.facebookUrl || '',
            twitterUrl: res.data.twitterUrl || '',
            instagramUrl: res.data.instagramUrl || '',
          });

          setLoading(false);
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserProfile();
  }, []);

  // console.log('from settings', userProfile);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitRecord = async () => {
    const {
      displayName,
      about,
      language,
      country,
      gender,
      image,
      twitterUrl,
      facebookUrl,
      instagramUrl,
    } = userProfile;
    setLoading(true);

    await axios
      .put(`/api/user/profile`, {
        displayName,
        about,
        language,
        country,
        gender,
        image,
        twitterUrl,
        facebookUrl,
        instagramUrl,
      })
      .then(function (response) {
        if (response) {
          setLoading(false);
          alert('Profile updated successfully');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const changePasssword = async () => {
    if (oldPassword.length === 0 || newPassword.length === 0) {
      setFormDataError(true);
      return;
    }

    await axios
      .post(`/api/user/updatepassword`, {
        oldPassword,
        newPassword,
      })
      .then((response) => {
        if (response) {
          setErrorMessage('');
          alert('password Change successful');
        }
      })
      .catch((error) => {
        // console.log(error);
        setErrorMessage(error?.response?.data);
      });
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label='lab API tabs example'
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
            // scrollButtons='auto'
            // aria-label="scrollable auto tabs example"
          >
            <Tab className={styles.userTab} label='Account' value='1' />
            <Tab className={styles.userTab} label='Profile' value='2' />
            <Tab className={styles.userTab} label='Password Reset' value='3' />

            {/* <Tab
              className={styles.userTab}
              label='Safety &amp; Security'
              value='4'
            /> */}
          </TabList>
        </Box>
        <TabPanel value='1'>
          <div className={styles.tab_container}>
            <div className={styles.tab_title}>
              <p>Account Settings</p>
              <p>Account Preference</p>
            </div>

            <div className={styles.tab_email}>
              <p>Email Address</p>
              <p>{session?.user?.email}</p>
            </div>

            <div className={styles.tab_country}>
              <div
                className={`${styles.tab_country_inner} ${styles.tab_countryGender}`}
              >
                <p>Gender</p>
                <select
                  name='gender'
                  id=''
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      gender: e.target.value,
                    })
                  }
                  value={userProfile.gender}
                >
                  {/* <option value={userProfile?.gender || 'Male'}>
                    {userProfile?.gender || 'Male'}
                  </option> */}
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
              <p>
                This information may be used to improve your recommendations and
                ads.
              </p>
            </div>

            <div className={styles.tab_country}>
              <div className={styles.tab_country_inner}>
                <p>Display Language</p>
                <select
                  name='language'
                  id=''
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      language: e.target.value,
                    })
                  }
                  value={userProfile.language}
                >
                  {/* <option value={userProfile?.language || 'English'}>
                    {userProfile?.language || 'English'}
                  </option> */}

                  <option value='English'>English</option>
                  <option value='French'>French</option>
                  <option value='German'>German</option>
                </select>
              </div>
              <p>
                Select the language you&rsquo;d like to experience in the
                Forumix interface. Note that this won&rsquo;t change the
                language of user-generated content and that this feature is
                still in development so translations and UI are still under
                review.
              </p>
            </div>
            <div className={styles.tab_country}>
              <div className={styles.tab_country_inner}>
                <p>Country</p>
                <select
                  name='country'
                  id=''
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      country: e.target.value,
                    })
                  }
                  value={userProfile.country}
                >
                  {/* <option value={userProfile?.country || 'Ngeria'}>
                    {userProfile?.country || 'Ngeria'}
                  </option> */}

                  <option value='Ngeria'>Nigeria</option>
                  <option value='Ghana'>Ghana</option>
                  <option value='USA'>USA</option>
                </select>
              </div>
              <p>This is your primary location.</p>
            </div>

            <button onClick={submitRecord} className={styles.tab_button}>
              Save Settings
            </button>
          </div>
        </TabPanel>
        <TabPanel value='2'>
          <div className={styles.tab_container}>
            <div className={styles.tab_title}>
              <p>Customize Profile</p>
              <p>Profile Information</p>
            </div>

            <div className={styles.profileName}>
              <p>Display name (optional)</p>
              <p>Set a display name. This does not change your username.</p>
              <input
                type='text'
                placeholder='display name (optional)'
                id='displayName'
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    displayName: e.target.value,
                  })
                }
                value={userProfile.displayName}
              />{' '}
              <br />
              <p>
                {20 - userProfile?.displayName?.length} Characters remaining
              </p>
            </div>
            <div className={styles.profileName}>
              <p>About (optional)</p>
              <p>A brief description of yourself shown on your profile.</p>
              <textarea
                placeholder='display name (optional)'
                id='displayName'
                rows='4'
                cols='50'
                onChange={(e) =>
                  setUserProfile({ ...userProfile, about: e.target.value })
                }
                value={userProfile.about}
              >
                {' '}
              </textarea>
              <br />
              <p>{100 - userProfile?.about?.length} Characters remaining</p>
            </div>
            <div className={styles.profileName}>
              <p>Twitter Account (optional)</p>
              <p>Set a Twitter Handle</p>
              <input
                type='text'
                placeholder='Twitter'
                id='Twitter'
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    twitterUrl: e.target.value,
                  })
                }
                value={userProfile.twitterUrl}
              />{' '}
              <br />
            </div>
            <div className={styles.profileName}>
              <p>Facebook Account (optional)</p>
              <p>Set a Facebook Handle</p>
              <input
                type='text'
                placeholder='Facebook'
                id='Facebook'
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    facebookUrl: e.target.value,
                  })
                }
                value={userProfile.facebookUrl}
              />{' '}
              <br />
            </div>
            <div className={styles.profileName}>
              <p>Instagram Account (optional)</p>
              <p>Set an Instagram Handle</p>
              <input
                type='text'
                placeholder='Instagram'
                id='Instagram'
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    instagramUrl: e.target.value,
                  })
                }
                value={userProfile.instagramUrl}
              />{' '}
              <br />
            </div>
            <button onClick={submitRecord} className={styles.tab_button}>
              Save Settings
            </button>
          </div>
        </TabPanel>
        <TabPanel value='3'>
          <div className={styles.tab_container}>
            <div className={styles.tab_title}>
              <p>Password Settings</p>
              <p>If password is compromised, try restting it.</p>
            </div>

            <div className={styles.tab_email}>
              {errorMessage && (
                <div className={styles.error_message}>{errorMessage}</div>
              )}
              <p>Reset Password</p>
              <p>
                Leave the pasword field empty if you do not wish to change it.
              </p>
              <input
                className='password_input'
                type='password'
                placeholder='Enter Old Password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />{' '}
              <br />
              {formDataError && oldPassword.length <= 0 ? (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  * required
                </span>
              ) : (
                ''
              )}
              <input
                className='password_input'
                type='password'
                placeholder='Enter New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {formDataError && newPassword.length <= 0 ? (
                <span style={{ color: 'red', fontSize: '12px' }}>
                  * required
                </span>
              ) : (
                ''
              )}
            </div>

            <button onClick={changePasssword} className={styles.tab_button}>
              Reset password
            </button>
          </div>
        </TabPanel>
        {/* <TabPanel value='4'>
          <div className={styles.tab_container}>
            <div className={styles.tab_title_safety}>
              <p>Safety &amp; Security</p>
              <p>
                Manage how we use data to personalize your Reddit experience,
                and control how other redditors interact with you.
              </p>
              <p>Safety</p>
            </div>
            <div className={styles.profileName}>
              <p>People You&rsquo;ve Blocked</p>
              <p>
                {' '}
                Blocked people can&rsquo;t send you chat requests or private
                messages.
              </p>
              <div className={styles.inputContainer}>
                <input
                  type='text'
                  className={styles.safety_input}
                  placeholder='Block new user'
                  id='displayName'
                />

                <button className={styles.userBtn}>Add</button>
              </div>
              <button className={styles.tab_button}>Save Settings</button>
            </div>
          </div>
        </TabPanel> */}
      </TabContext>
    </Box>
  );
}
