import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import NewsSearch from './pages/NewsSearch';
import './index.css'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsSearch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
