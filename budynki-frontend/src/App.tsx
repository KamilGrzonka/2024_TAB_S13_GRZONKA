import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/navBar/Navbar';
import Buildings from './pages/Buildings';
import Persons from './pages/Persons';
import Payments from './pages/Payments';
import Registartions from './pages/Registrations';
import Repairs from './pages/Repairs';
import Reports from './pages/Reports';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Buildings/>} />
        <Route path='/meldunki' element={<Registartions/>} />
        <Route path='/zgloszenia' element={<Repairs/>} />
        <Route path='/osoby' element={<Persons/>} />
        <Route path='/platnosci' element={<Payments/>} />
        <Route path='/raporty' element={<Reports/>} />
      </Routes>
    </>
  );
}
