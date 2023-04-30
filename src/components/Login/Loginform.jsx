import React,{ useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { useBookmarks } from '../Context';
import axios from 'axios';



const Login = () => {
    
    const Navigate = useNavigate();
    const { Usernamechange, Passwordchange, validate, access_token, setRecords, checkUserNameAndPassword } = useBookmarks(); 

    const authenticate = async(e) => {
      e.preventDefault();
      if(!validate())
        return;
      
        const res = await axios.get('https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        })
        console.log(res.data.records);
        setRecords(res.data.records);
        if(checkUserNameAndPassword())
        {
          console.log("logged in successfully");
          localStorage.setItem("loggedIn",true)
          Navigate('/Home');
          // setCookie("addedrestaurants", JSON.stringify(restaurantlist));
          // setCookie("bookmarkrestaurants", JSON.stringify(restaurantlist));
          // setRestaurantlist(cookies['addedrestautants']);
          // setBookmarks(cookies['bookmarkrestautants']);
        }  
        else
          alert("incorrect credentials");
    }
    
  useEffect(() => {
    if(localStorage.getItem("loggedIn")){
      Navigate("/Home");
      alert("You are already logged in");
    }
  }, [])
  
  return (
    <div className="center">
        <h1> Login </h1>
        <form>
            <div className="txt_field">
                <input type="text" onChange={Usernamechange} required/>
                <span></span>
                <label>Username</label>
            </div>         
            <div className="txt_field">
                <input type="password" onChange={Passwordchange} required/>
                <span></span>
                <label>Password</label>
            </div>
            <div className="pass">Forgot Password ?</div>
            <button className ='Login' onClick={authenticate}>Login</button>
            <div className="signup_link">
                Not a member ? <a href="Register">Register</a>
            </div>
        </form>
    </div>    
  )
}

export default Login;