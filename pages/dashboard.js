import React from 'react';
import styles from '../styles/Dashboard.module.css';
import Navbar from '../components/Navbar/Navbar';
const dashboard = () => {
	let login = false;
	return (
		<div>
			<Navbar />
			{/* <h1 className={login ? styles.dashboardHeader : styles.dashboardHeaderActive}>Dashboard page</h1> */}
			<h1 style={{ marginTop: '100px', textAlign: 'center' }}>Dashboard page</h1>
		</div>
	);
};

export default dashboard;
