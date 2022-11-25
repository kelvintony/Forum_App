import React from 'react';
import styles from '../styles/Dashboard.module.css';
const dashboard = () => {
	let login = false;
	return (
		<div>
			<h1 className={login ? styles.dashboardHeader : styles.dashboardHeaderActive}>Dashboard algorithm</h1>
		</div>
	);
};

export default dashboard;
