import React, { useEffect} from 'react'
import './Home.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useBookmarks } from '../Context';
import Navbar from '../Navbar/Navbar';
import { Cookies } from 'react-cookie';


const Home = () => {
  
  const {addBookmark, getRestaurants, addRestaurant, handleSearchbarChange, removeRestaurant, restaurants, restaurantlist} = useBookmarks();
  
  useEffect(() => {
    getRestaurants();
  },[])


  return (
    <>
    <Navbar/>
    <div className='home-container'>
        <div className='searchbar'>
            <ReactSearchAutocomplete
                items={restaurants}
                onSelect = {handleSearchbarChange}
                onSearch={handleSearchbarChange}
                />
        </div>

        <div className='Button'><button className="button" role="button" onClick = {addRestaurant} >ADD</button> </div>
        <div className='maps'>
        {restaurantlist.map(restaurant => {
          return (
            <div className='single-map'>
            <div key={restaurant} className='map-inside'><iframe width="1200" height="200" src={`https://lookerstudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurant}"}`} allowFullScreen></iframe> </div>
            <div className='map-buttons'>
              <button className='Bookmark' onClick={() => addBookmark(restaurant)}>BookMark</button>
              <button className='remove' onClick={() => removeRestaurant(restaurant)}>remove</button>
            </div>
            </div>
          )
        })}
        </div>
    </div>  
    </>
  )
}

export default Home