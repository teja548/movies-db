import React from 'react';
import { Routes, Route } from 'react-router-dom';
import List from './pages/List';
import Details from './pages/Details';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='details' element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
