import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie';


const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;


function BookmarksStateProvider({ children }) {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [records, setRecords] = useState([]);
  const [restaurantlist, setRestaurantlist] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [bookmarks, setBookmark] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies([`addedrestaurants-${username}`, `bookmarkrestaurants-${username}`]);

  const access_token = 'keyfXgn8PL6pB3x32';

  function Usernamechange(e)
    {
        e.preventDefault();
        SetUsername(e.target.value);
    }

    function Passwordchange(e)
    {
        e.preventDefault();
        SetPassword(e.target.value);
    }


      const validate =() =>{
          let res = true;
          if(username === "" || username === null)
          {
                res = false;
                alert('please enter username');
          } 
          if(password === "" || password === null) 
          {
                res = false;
                alert('please enter Password'); 
          }
          return res;
      }

      const checkUserNameAndPassword = () => {
        let res = false;
        records.forEach(record => {
          const fields = record.fields;
          if(username === fields.username && password === fields.password)
            res = true;
        });
        return res;
      }


  const addBookmark = (bookmark) =>{
    if(!bookmarks.includes(bookmark))  setBookmark([...bookmarks,bookmark]);
    setCookie(`bookmarkrestaurants-${username}`, JSON.stringify(bookmarks));
  }
  
  const removeBookmark = (bookmark) => {
    const updatedbookmarks = bookmarks.filter((r) => r !== bookmark);
    setBookmark(updatedbookmarks);
  }

  const getRestaurants = () =>{
    axios.get('https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants', {
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            })
            .then((res) => {
              const records = res.data.records;
              let rest = [];
              records.forEach((record,i) => {
                rest.push({id: i,name: record.fields.Name});
              });
              setRestaurants(rest);
            })
            .catch((error) => {
              console.error(error)
            })
  }

  const addRestaurant = () =>{
    let res = false;
    let al = false;
    if(restaurantlist.includes(currentRestaurant)) al = true;
    if(al) alert('restaurant already added..!')
    else{
      restaurants.forEach(restaurant => {
        if(currentRestaurant === restaurant.name) res = true;
      });
      if(!res)alert("No Restaurant found with given name")
      else 
      {
        setRestaurantlist([...restaurantlist, currentRestaurant]);  
        setCookie(`addedrestaurants-${username}`, JSON.stringify(restaurantlist));
        console.log(cookies[`addedrestaurants-${username}`]);
      }
    }
  }

  const handleSearchbarChange = (e) => {
    setCurrentRestaurant(e.name || e);
  }

  const removeRestaurant = (restaurant) => {
    const updatedRestaurants = restaurantlist.filter((r) => r !== restaurant);
    setRestaurantlist(updatedRestaurants);
  }

  return (
    <LocalStateProvider value={{addBookmark, removeBookmark, bookmarks, getRestaurants, addRestaurant, handleSearchbarChange, removeRestaurant,
     restaurantlist, restaurants, username, password, records, setRecords, validate, Usernamechange, Passwordchange, checkUserNameAndPassword,
      access_token, setCookie, removeCookie, cookies, restaurantlist, setBookmark, setRestaurantlist, setBookmark}}>
      {children}
    </LocalStateProvider>
  );
}

function useBookmarks() {
  const all = useContext(LocalStateContext);
  return all;
}

export { BookmarksStateProvider, useBookmarks };
