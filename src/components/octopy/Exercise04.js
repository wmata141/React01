import React, { Component } from 'react';
import PageView from '../../components/layout/PageView';
import List from '../../components/list/List';

export default class Exercise04 extends Component {
  render() {
    const instructions = [
      <span>Consulta la siguiente <a href='https://jsonplaceholder.typicode.com/users'>ruta</a> de una REST API.</span>,
      <span>En la consola de desarrollador imprime los elementos con id 1, 3, y 5.</span>,
    ];
    return (
      <PageView title="Exercise 4" subtitle="">
        <List list={instructions} />
        <hr style={{ color: '#3498db', backgroundColor: '#3498db', height: 1 }} />
      </PageView>
    );
  }
}
