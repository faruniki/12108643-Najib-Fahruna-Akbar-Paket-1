import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/Auth';
import Buku from './Pages/Buku';
import Koleksi from './Pages/Koleksi';
import Kategori from './Pages/Kategori';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/buku' Component={Buku}/>
        <Route path='/koleksi' Component={Koleksi}/>
        <Route path='/kategori' Component={Kategori}/>
      </Routes>
    </Router>
  );
}

export default App;
