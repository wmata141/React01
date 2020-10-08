import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'

const CountryHook = () => {
  const [countryList, setCountryList] = useState([]);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    console.log("useEffect()")
    getData()
  }, [])

  const getData = async () => {
    const data = await fetch('https://restcountries.eu/rest/v2/all')
    const countryList = await data.json()
    setCountryList(countryList)
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
          <h1>
            <img width={80} src={reactLogo} alt="react logo" /> {'Country Hook'}
          </h1>        
        </header>
        {
          countryList.map(item => (
            <li key={item.name}>{item.name}</li>
          ))
        }   
        <footer>
          footer
        </footer>
      </main> 
    </Aside>    
  )
}

export default CountryHook;
