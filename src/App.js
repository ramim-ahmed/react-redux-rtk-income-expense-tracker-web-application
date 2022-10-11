import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import TransactionList from './pages/TransactionList';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/transactions-list' element={<TransactionList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
