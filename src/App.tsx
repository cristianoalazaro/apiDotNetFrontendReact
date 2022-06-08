import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Header } from './pages/templates/Header/Header';
import { Produto } from './pages/Produto/Produto';
import { Footer } from './pages/templates/Footer/Footer';
import { NotFound } from './pages/NotFound/NotFound';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer autoClose={5000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/product' element={<PrivateRoute><Produto /></PrivateRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
