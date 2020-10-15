import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'

const About = () => {
  const [toggled, setToggled] = useState(false);
  const arr = [-4, 3, -9, 0, 4, 1]
  const list = [1,2,3]
  const list2 = ["Barbara", "Carla", "Andres", ]
  useEffect(() => {
      // plusMinus(arr)
      // sum(list)
      PrintNames(list2)
  }, [])

function plusMinus(arr) {
    let mas, menos, zero;
    mas = menos = zero = 0;
    arr.forEach(element => {
      if(element > 0) {
        mas += 1
      } else {
        if(element < 0) {
          menos += 1
        } else {            
          zero += 1        
        }
      }      
    });
    const arrResult = []

    const mas2 = (mas / arr.length).toFixed(6)    
    const menos2 = (menos / arr.length).toFixed(6)
    const zero2 = (zero / arr.length).toFixed(6)
    
    arrResult.push(mas2)
    arrResult.push(menos2)
    arrResult.push(zero2)
    
    console.log("Number(0.500000).toFixed(5)",typeof(Number(0.500000).toFixed(5)),' ', Number(0.500000).toFixed(5))
    console.log(arrResult)
  }
  
  const sum = ( list ) => {
    let count = 0;
    list.forEach( item => {
      count += item
    })
    return show(count)
  }

  const show = (sum) => {
    console.log(sum)
  }

  const PrintNames  = (names) => {
    names.sort()
    
    let rows = [];
    rows.push('<ol>')
    names.forEach(item => {
        rows.push(`<li>${item}</li>`)                 
    });
    rows.push('</ol>')      
    console.log(rows);
    return rows
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
            <img width={80} src={reactLogo} alt="react logo" /> {'About'}
          </h1>        
        </header>
        <h2>about: {PrintNames(list2)}</h2>       
        <footer>
          footer
        </footer>
      </main> 
    </Aside>    
  )
}

export default About;
