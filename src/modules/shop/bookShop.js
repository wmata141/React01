import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { books } from '../../utils/bookData'
import reactLogo from '../../assets/images/logo.svg'
import { FaBars } from 'react-icons/fa'
import Aside from '../../components/Aside'
import Card from './card'

const BookShop = () => {
  const cartItems = useSelector(state => state)
  const [toggled, setToggled] = useState(false);

  let history = useHistory();    
  const handleClick = () => {
      history.push('/carShop');
  }
  
  return (    
    <Aside        
      toggled={toggled}  
      setToggled={setToggled}      
    >
      <main>
        <div className="btn-toggle" onClick={() => setToggled(true)}>
          <FaBars />
        </div>
        <header>
          <h1 onClick={handleClick}>
            <img width={80} src={reactLogo} alt="react logo" /> {'BookShop'}
            <p style={{color: 'blue'}}>{cartItems.length}</p>
          </h1>    
        </header>
        <div className="home-page">
          {
            books.map((book, i) => {
                return (              
                  <Card key={i} cartItems={cartItems} book={book} actionCart={true} />
                )
            })
          }      
        </div>       
        <footer>
          footer
        </footer>
      </main> 
    </Aside>    
  )
}

export default BookShop;
