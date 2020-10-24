import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/css/index.scss';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'

const About = () => {
  const [toggled, setToggled] = useState(false);
  useEffect(() => {
  }, [])

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
            <img width={80} src={reactLogo} alt="react logo" /> {'About'}
          </h1>
        </header>
        <h2>About: </h2>        
        <footer>
          footer
        </footer>
      </main>
    </Aside>
  )
}

export default About;