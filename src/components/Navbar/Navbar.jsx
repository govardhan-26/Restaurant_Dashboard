import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useBookmarks } from '../Context';

const Navbar = () => {
  const { removeCookie, username } = useBookmarks();
  const navigate = useNavigate();
  const logout = () =>{
    removeCookie(`addedrestaurants-${username}`);
    removeCookie(`bookmarkrestaurants-${username}`);
    localStorage.removeItem("loggedIn");
    navigate('/');
  }
  return (
    <div className='nav-container'>
        <nav>
             <Link to='/Home' className='nav1'><ul>Home</ul></Link>
            <Link to='/Bookmark' className='nav2'><ul>Bookmarked Restaurants</ul></Link>
            

            <button className='logout' onClick={logout}>Log Out</button>
        </nav>
    </div>
  )
}

export default Navbar