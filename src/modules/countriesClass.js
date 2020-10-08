import React, { Component } from 'react';
import { FaBars } from 'react-icons/fa';
import reactLogo from '../assets/images/logo.svg';
import Aside from '../components/Aside'

class CountryClass extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      toggled: false
    };
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        this.setState({
          list: myJson
        });
      });
  }

  setToggled(state) {
    this.setState({
      toggled: state
    })
  }

  render() {
    let { list, toggled } = this.state;   

    return (
      <Aside        
        toggled={toggled}  
        setToggled={this.setToggled}      
      >
        <main>
          <div className="btn-toggle" onClick={() => this.setToggled(true)}>
            <FaBars />
          </div>
          <header>
            <h1>
              <img width={80} src={reactLogo} alt="react logo" /> {'Country Class'}
            </h1>        
          </header>
          {
            list.map((item, i) => {
              return (
                <li key={item.name}>{item.name}</li>
              )
            })
          }    
          <footer>
            footer
          </footer>
        </main> 
      </Aside>    
    );
  }
}

export default CountryClass;