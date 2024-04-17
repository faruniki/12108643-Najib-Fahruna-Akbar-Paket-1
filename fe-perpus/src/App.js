import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/Auth';
import Buku from './Pages/Buku';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/buku' Component={Buku}/>
      </Routes>
    </Router>
  );
}

export default App;
