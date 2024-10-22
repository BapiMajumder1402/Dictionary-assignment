import React, { useState } from 'react';
import './Home.css'
import SearchWord from '../../components/searchWord/SearchWord';

const HomePage = () => {

  return (
    <div className='page'>
        <SearchWord/>
    </div>
  );
};

export default HomePage;
