import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Aside from '../../components/Aside'

function Index() {
  const [toggled, setToggled] = useState(false);

  return (
    <Aside        
      toggled={toggled}  
      setToggled={setToggled}      
    >
      <main style={{padding: 0}}>
        <div className="App-header" >
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </div> 
      </main>    
    </Aside>    
  );
}

export default Index;
