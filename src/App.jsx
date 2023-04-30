import React from 'react'
import Home from './components/Home/Home'
import Login from './components/Login/Loginform'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookmark from './components/Bookmark/Bookmark';
import { BookmarksStateProvider } from './components/Context';
import './App.css'
import {CookiesProvider} from 'react-cookie'
import Navbar from './components/Navbar/Navbar';

const App = () => {
  
  return (
    <CookiesProvider>
      <BookmarksStateProvider>    
      <BrowserRouter>
          <Routes>
            <Route path="/" element ={<Login />} />
            <Route path="/Home" element ={<Home />} />
            <Route path="/BookMark" element ={<Bookmark />} />
            <Route path="/Navbar" element ={<Navbar />} />
        </Routes>
      </BrowserRouter>
      </BookmarksStateProvider>
    </CookiesProvider>
  )
}

export default App