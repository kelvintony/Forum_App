import React, { useState } from 'react';
import styles from '../../styles/MultiForm.module.css';

const First = ({ formData, setFormData }) => {
  return (
    <div>
      <h1>Hi there</h1>
      <p>To start with, whats your beautiful name?</p>
      <br />
      <input
        onChange={(e) => {
          setFormData({
            ...formData,
            name: e.target.value,
          });
        }}
        value={formData.name}
        type='text'
        placeholder='Enter Name'
      />
    </div>
  );
};
const Second = ({ formData, setFormData }) => {
  return (
    <div>
      <h1>Hi there</h1>
      <p>Testing the second page</p>
      <br />
      <input
        onChange={(e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        }}
        value={formData.email}
        placeholder='Enter email'
        type='email'
      />
      <br />
      <input
        onChange={(e) => {
          setFormData({
            ...formData,
            employmentStatus: e.target.value,
          });
        }}
        value={formData.employmentStatus}
        type='text'
        placeholder='Enter employment status'
      />
    </div>
  );
};
const Third = ({ formData }) => {
  return (
    <div>
      <h1>Verify Your Details</h1>
      <p>name: {formData.name}</p>
      <br />
      <p>Email: {formData.email}</p>
      <br />
      <p>Employment: {formData.employmentStatus}</p>
      <br />
    </div>
  );
};
const Multiform = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employmentStatus: '',
  });

  const FormTitles = ['name', 'email', 'Send file '];

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <First formData={formData} setFormData={setFormData} />;
      case 1:
        return <Second formData={formData} setFormData={setFormData} />;
      default:
        return <Third formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className={styles.multiform_container}>
      <div className={styles.progressbar}>
        <div
          style={{ width: page === 0 ? '33.3%' : page == 1 ? '66.6%' : '100%' }}
        ></div>
      </div>
      <div>{/* <h1>{FormTitles[page]}</h1> */}</div>
      <div>{conditionalComponent()}</div>
      <br />
      <div className={styles.form_btn}>
        <button
          disabled={page == 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (page === FormTitles.length - 1) {
              alert('FORM SUBMITTED');
              console.log(formData);
            } else {
              setPage((currPage) => currPage + 1);
            }
          }}
        >
          {page === FormTitles.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Multiform;
