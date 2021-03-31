import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageView from '../../components/layout/PageView';
import List from '../../components/list/List';

export default class Exercise02 extends Component {
  render() {
    const instructions = [
      <span>Escribe el código para que el HTML de abajo actúe como un sistema de pestañas.</span>,
      <span>Sin borrar el código anterior, crea un componente que permita la misma funcionalidad pero que acepte una cantidad indeterminada de pestañas con contenido. Agrega un ejemplo de como usarlo. *</span>
    ];
    return (
      <PageView title="Exercise 2" subtitle="">
        <List list={instructions}/>
        <hr style={{ color: '#3498db', backgroundColor: '#3498db', height: 1 }} />
        
        <div style={{ margin: '0 15px' }} >
          <ul className="nav nav-tabs" role="tablist">
            <li className="active"><Link to="#">Tab 1</Link></li>
            <li className=""><Link to="#">Tab 2</Link></li>
            <li className=""><Link to="#">Tab 3</Link></li>
          </ul>
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active">Tab content 1</div>
            <div role="tabpanel" className="tab-pane">Tab content 2</div>
            <div role="tabpanel" className="tab-pane">Tab content 3</div>
          </div>
        </div>
        {/* Ejemplo de la versión en componente-> */}
        {/* <-Ejemplo de la versión en componente */}
      </PageView>
    );
  }
}
