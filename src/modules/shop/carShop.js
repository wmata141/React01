import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import reactLogo from '../../assets/images/logo.svg'
import Aside from '../../components/Aside'
import Card from './card'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CarShop = () => {
  const cartItems = useSelector(state => state)
  const [toggled, setToggled] = useState(false);

  let history = useHistory();    
  const handleClick = () => {
      history.push('/bookShop');
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
            <img width={80} src={reactLogo} alt="react logo" /> {'CarShop'}
            <p style={{color: 'red'}}>{cartItems.length}</p>
          </h1>        
        </header>
        <div className="home-page">
          {
            cartItems.map((book, i) => {
                return (              
                  <Card key={i} book={book} actionCart={false} cartItems={cartItems}/>
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

export default CarShop;
