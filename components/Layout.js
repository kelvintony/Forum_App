import React from 'react';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {/* <Notify /> */}
      {/* <Modal /> */}
      {children}
    </div>
  );
};

export default Layout;
