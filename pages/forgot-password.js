import React, { useState } from 'react';
import styles from '../styles/ForgotPassword.module.css';
import Link from 'next/link';
import axios from 'axios';

const initialState = {
  email: '',
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialState);

  const [isLoading, setisLoading] = useState(false);

  const [error, setError] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (formData.email.length === 0) {
      setError(true);
    }

    if (formData.email) {
      setisLoading(true);
      await axios
        .post('/api/password-recovery/password-link', formData)
        .then(function (response) {
          if (response) {
            // localStorage.setItem('profile', JSON.stringify(response.data));
            setisLoading(false);
            setMessage('Check your email for password reset link');
          }
        })
        .catch(function (error) {
          setisLoading(false);
          setErrorMessage(error.response.data.message);
        });
      // console.log(formData);
    }
  };

  return (
    <div className={styles.signin_container}>
      <div className={styles.post_input_content}>
        <h3 className={styles.blog_header}>Forgot Password</h3>
        {errorMessage && (
          <div className={styles.errorMessageContainer}>
            <p>{errorMessage}</p>
          </div>
        )}
        {message && (
          <div className={styles.messageContainer}>
            <p>{message}</p>
          </div>
        )}
        <label>
          Email <br />
          <input
            type='text'
            name='email'
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>{' '}
        <br />
        {error && formData.email.length <= 0 ? (
          <label style={{ color: 'red' }}>email can't be empty</label>
        ) : (
          ''
        )}
        <br />
        <div>
          <button
            className={styles.btn_submit}
            type='submit'
            onClick={handleSubmit}
          >
            {isLoading ? 'Loading...' : 'Send Reset Link'}
          </button>{' '}
          <br />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
