import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/navBar/Navbar';
import Footer from './components/footer/Footer';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const TablePage = lazy(() => import('./pages/Table'));

function App() {
  return (
    <Router>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  );
}

export default App;
