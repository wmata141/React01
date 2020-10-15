import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'
import { Link } from "react-router-dom";
import Hero from "../components/hotel/Hero";
import Banner from "../components/hotel/Banner";
import Services from "../components/hotel/Services";
import FeaturedRooms from "../components/hotel/FeaturedRooms";

const HotelHome = () => {
  const [toggled, setToggled] = useState(false);
  return (    
    <Aside        
      toggled={toggled}  
      setToggled={setToggled}      
    >
      {/* <main>
        <div className="btn-toggle" onClick={() => setToggled(true)}>
          <FaBars />
        </div>
        <header>
          <h1>
            <img width={80} src={reactLogo} alt="react logo" /> {'HotelHome'}
          </h1>        
        </header>
        <h2>HotelHome: </h2>       
        <footer>
          footer
        </footer>
      </main>  */}
      <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $299"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
    </Aside>    
  )
}

export default HotelHome;

