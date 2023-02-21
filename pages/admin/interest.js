import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/Interest.module.css';
import cancelIcon from '../../assets/single_community/cancel_icon.svg';
import Router, { useRouter } from 'next/router';
import axios from 'axios';

import { getSession, useSession } from 'next-auth/react';
import LeftSideBar from '../../components/leftSideBar/LeftSideBar';

import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import Loader from '../../components/Loader/Loader';

const columns = [
  { field: '_id', headerName: 'ID', width: 130 },
  { field: 'creator', headerName: 'Creator', width: 130 },
  { field: 'interestName', headerName: 'Interest Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
];

const Interest = (props) => {
  // let rows = [
  //   { _id: 1, creator: 'Snow', interestName: 'Jon', description: '35' },
  //   { _id: 2, creator: 'Lannister', interestName: 'Cersei', description: '42' },
  //   { _id: 3, creator: 'Lannister', interestName: 'Jaime', description: '45' },
  //   { _id: 4, creator: 'Stark', interestName: 'Arya', description: '16' },
  //   {
  //     _id: 5,
  //     creator: 'Targaryen',
  //     interestName: 'Daenerys',
  //     description: '30',
  //   },
  // ];

  console.log('from interest');

  const [rows, setRows] = useState([]);
  const router = useRouter();

  const { status, data: session } = useSession();

  const { redirect } = router.query;

  // const effectRan = useRef(false);

  const [loading, setLoading] = useState(false);

  const [interestData, setInterestData] = useState({
    interestName: '',
    description: '',
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      await axios
        .get(`/api/admin/interest`)
        .then((res) => {
          setRows(res.data);
          // console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };
    getPosts();
  }, []);

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
          // router.push('/');
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const simpleDiv = {
    marginTop: '20px',
    height: '300px',
    width: '300px',
    paddingLeft: '90px',
  };
  if (session?.user.hasOwnProperty('isAdmin') === false) {
    return null;
  }

  return (
    <div className={styles.interest_container}>
      <h1>Interest</h1>

      <Link href='/admin/create-interest' className={styles.btn_register}>
        Create interest
      </Link>
      <div style={{ height: 400, width: '100%' }}>
        {loading ? (
          <div style={simpleDiv}>
            <Loader />
          </div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        )}
      </div>
    </div>
  );
};

Interest.auth = { adminOnly: true };
export default Interest;
