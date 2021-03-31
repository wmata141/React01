import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import '../assets/styles/css/index.scss';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'
// import StepperExample from './stepperExample';

const About = () => {
  const [toggled, setToggled] = useState(false);
  useEffect(() => {

    superStack();

  }, [])

  

  const fizzBuzz = (n) => {
    for (let index = 1; index <= n; index++) {
      if (index % 3 === 0 && index % 5 === 0) {
        console.log("FizzBuzz");
      } else {
        if (index % 3 === 0 && index % 5 !== 0) {
          console.log("Fizz");
        } else {
          if (index % 3 !== 0 && index % 5 === 0) {
            console.log("Buzz");
          } else {
            console.log(index);
          }
        }
      }
    }
  }

  const numDuplicate = () => {
    const name = ['ball', 'box', 'ball', 'ball', 'box']
    const price = [2, 2, 2, 2, 2]
    const weight = [1, 2, 1, 1, 3]
    const n = name.length
    const newArray = [];
    for (let index = 0; index < n; index++) {
      const obj = {
        'nombre': name[index],
        'precio': price[index],
        'peso': weight[index],
      }
      newArray.push(obj)
    }

    let sinRepetidos = newArray.filter((valorActual, indiceActual, arreglo) => {
      return arreglo.findIndex(item => JSON.stringify(item) === JSON.stringify(valorActual)) === indiceActual
    });

    const result = n - sinRepetidos.length
    console.log(result)
  }

  const superStack = () => {
    const operations = ['push 4', 'push 5', 'inc 2 1', 'pop', 'pop']
    const array = [];
    let index = 0;
    operations.forEach((element) => {
      const res = element.split(' ');
      if (res.length === 2) {
        array.push(parseInt(res[1]))
        console.log(array[index]);
        index++
      } else {
        index--
        if (res.length === 3) {
          for (let i = 0; i < (parseInt(res[1]) || index); i++) {
            array[i] = array[i] + parseInt(res[2])
          }
          console.log(array[index]);
        } else {
          if (res.length === 1) {
            array.pop();
            if (array[index]) {
              console.log(array[index]);
            } else {
              console.log("EMPTY");
              index++
            }           
            index--
          }
        }
        index++
      }      
    });    
  }

  const sortRoman = () => {
    const names = ['Louis IX', 'Louis VIII']
    const array = [];
    let index = 0;
    names.forEach((element) => {
      const res = element.split(' ');
      names.forEach(element => {
        if ( element.startsWith(res[1])) {
          array.push(element)
        }

      });      
    });    
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
        <h2>About: </h2>

        {/* <StepperExample /> */}

        <footer>
          footer
        </footer>
      </main>
    </Aside>
  )
}

export default About;