import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../../../../../../components/Navbar/Navbar';

import styles from '../../../../../../styles/Home.module.css';

const VerifyUser = ({ data }) => {
	// const [ errorMessage, setErrorMessage ] = useState('');

	// const [ isUserVerified, setIsUserVerified ] = useState(false);

	// const router = useRouter();

	// const userId = router.query.userId;

	// const tokenId = router.query.tokenId;

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		await axios
	// 			.get(`http://localhost:5000/user/verifytoken/${userId}/verify/${tokenId}`)
	// 			.then((res) => {
	// 				setIsUserVerified(true);
	// 				// console.log(res);
	// 			})
	// 			.catch((err) => {
	// 				setErrorMessage(err?.response?.data?.message)
	// 				console.log(err);
	// 			});
	// 	};
	// 	fetchData();

	// }, []);

	// let myStyle={

	// }

	const myStyle = {
		textAlign: 'center',
		width: '150px',
		fontSize: '15px',
		marginTop: '20px',
		fontWeight: ' 300px',
		color: 'white',
		letterSpacing: ' 0.05rem',
		background: '#f48023',
		padding: '20px'
	};

	return (
		<div>
			<Navbar />
			<div className={styles.home_container}>
				{/* {isUserVerified && <h3>User is verified</h3>} */}
				<h3>{data.message}</h3>

				{data.message === 'Email verified successfully' && (
					<Link style={myStyle} href='/signin'>
						Signin
					</Link>
				)}
				{/* {errorMessage && <p>{errorMessage}</p>} */}
				{/* Verify User user id: {userId} -- token id: {tokenId} */}
			</div>
		</div>
	);
};

export const getServerSideProps = async ({ params }) => {
	const { userId } = params;
	const { tokenId } = params;

	const res = await fetch(`https://forum-api-3fif.onrender.com/user/verifytoken/${userId}/verify/${tokenId}`);

	const data = await res.json();
	console.log('from props' + data);
	return {
		props: {
			data
		}
	};
};

export default VerifyUser;
