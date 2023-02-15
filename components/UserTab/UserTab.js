import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from '../../styles/UserTab.module.css';

import { useSession } from 'next-auth/react';

export default function LabTabs() {
  const { status, data: session } = useSession();

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab className={styles.userTab} label='Account' value='1' />
            <Tab className={styles.userTab} label='Profile' value='2' />
            <Tab
              className={styles.userTab}
              label='Safety &amp; Security'
              value='3'
            />
            <Tab className={styles.userTab} label='Password Reset' value='4' />
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

            <div className={styles.tab_email}>
              <p>Reset Password</p>
              <p>
                Leave the pasword field empty if yo do not wish to change it.
              </p>
              <input
                className='password_input'
                type='password'
                placeholder='Enter Old Password'
              />{' '}
              <br />
              <input
                className='password_input'
                type='password'
                placeholder='Enter New Password'
              />
            </div>

            <div className={styles.tab_country}>
              <div
                className={`${styles.tab_country_inner} ${styles.tab_countryGender}`}
              >
                <p>Gender</p>
                <select name='gender' id=''>
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
                <select name='language' id=''>
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
                <select name='country' id=''>
                  <option value='Ngeria'>Nigeria</option>
                  <option value='Ghana'>Ghana</option>
                  <option value='USA'>USA</option>
                </select>
              </div>
              <p>This is your primary location.</p>
            </div>

            <button className={styles.tab_button}>Save Settings</button>
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
              />{' '}
              <br />
              <p>20 Characters remaining</p>
            </div>
            <div className={styles.profileName}>
              <p>About (optional)</p>
              <p>A brief description of yourself shown on your profile.</p>
              <textarea
                placeholder='display name (optional)'
                id='displayName'
                rows='4'
                cols='50'
              >
                {' '}
              </textarea>
              <br />
              <p>20 Characters remaining</p>
            </div>
            <button className={styles.tab_button}>Save Settings</button>
          </div>
        </TabPanel>
        <TabPanel value='3'>
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
        </TabPanel>
        <TabPanel value='4'>
          <div className={styles.tab_container}>
            <div className={styles.tab_title}>
              <p>Password Settings</p>
              <p>If password is compromised, try restting it.</p>
            </div>

            <div className={styles.tab_email}>
              <p>Reset Password</p>
              <p>
                Leave the pasword field empty if yo do not wish to change it.
              </p>
              <input
                className='password_input'
                type='password'
                placeholder='Enter Old Password'
              />{' '}
              <br />
              <input
                className='password_input'
                type='password'
                placeholder='Enter New Password'
              />
            </div>

            <button className={styles.tab_button}>Reset password</button>
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
