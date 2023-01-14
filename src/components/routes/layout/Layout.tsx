import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Categories from '../../categories/Categories';
import Companies from '../../companies/Companies';
import CouponsContainer from '../../coupons/CouponsContainer/CouponsContainer';
import Footer from '../footer/footer';
import Header from '../header/header';
import Login from '../../modals/login-modal/LoginModal';
import NotFound from '../not-found/NotFound';
import Purchases from '../../purchases/Purchases';
import Register from '../../register/Register';
import TestLayout from '../../../tests/TestLayout';
import Users from '../../users/Users';
import './Layout.css';

function Layout() {
  return (
    <div>
      <section className='layout'>       
        <header>
          <Header />
        </header>

        <main>
          <Routes>
          
          <Route path='/test' element={<TestLayout/>}></Route>
            <Route path="/home" element={<CouponsContainer />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/companies" element={<Companies />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/purchases" element={<Purchases />}></Route>
            <Route path="/" element={<Navigate to="home" />}></Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </section>
    </div>
  )
}

export default Layout;