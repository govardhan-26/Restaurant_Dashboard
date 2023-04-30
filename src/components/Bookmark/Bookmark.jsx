import React from 'react'
import { useBookmarks } from '../Context';
import './Bookmark.css'
import Navbar from '../Navbar/Navbar';

const Bookmark = () => {
  
  const {removeBookmark, bookmarks} = useBookmarks();

  return (
    <div>
      <Navbar/>
        {/* <div className='heading'><h1>Bookmarked Restaurants</h1></div> */}
        <div className='bookmarkedmaps'>
        {bookmarks.map(restaurant => {
          return (
            <div className='single-map'>
            <div key={restaurant} className='map-inside'><iframe width="1200" height="200" src={`https://lookerstudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurant}"}`} allowFullScreen></iframe> </div>
            <div className='map-buttons'>
              <button className='remove' onClick={() => removeBookmark(restaurant)}>remove</button>
            </div>
            </div>
          )
        })}
        </div>
    </div>
  )
}

export default Bookmark