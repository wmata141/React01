import React, { Component } from 'react';
import PageView from '../../components/layout/PageView';
import BoxView from '../../components/layout/BoxView';
import List from '../../components/list/List';

function fake(page, limit) {
  var users = [];
  var start = ((page - 1) * limit) + 1;
  for(var i = 0; i < limit; i += 1) {
    users.push({
      id: `id${start + i}`,
      username: `user${start + i}`,
      email: `user${start + i}@example.com`,
      createdAt: Date(),
      balance: Math.floor(9999999 * Math.random()) / 100
    });
  }
  return users;
}

export default class Exercise03 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: fake(1, 25)
    };
  }

  render() {
    const instructions = [
      <span>Escribe el código para mostrar todos los usuarios guardados en el state.</span>,
      <span>La propiedad balance muestrala en formato moneda. Ejemplo: $12,345.67.</span>,
      <span>La propiedad createdAt muestrala como el formato de ejemplo. Ejemplo: 18/01/2019 10:00 am.</span>,
      <span>Oculta la columna Id.</span>,
      <span>Haz que las filas intercalen su color usando los siguientes tres colores: lightgreen, lightblue, lightgrey. *</span>,
      <span>Usa el input para limitar el número de filas que se muestrán en la tabla. *</span>
    ];
    return (
      <PageView title="Exercise 3" subtitle="">
        <List list={instructions} />
        <hr style={{ color: '#3498db', backgroundColor: '#3498db', height: 1 }} />

        <div>
          <input type="number" />
          <BoxView title='Lista de usuarios'>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.users[0].id}</td>
                  <td>{this.state.users[0].username}</td>
                  <td>{this.state.users[0].email}</td>
                  <td>{this.state.users[0].balance}</td>
                  <td>{this.state.users[0].createdAt}</td>
                </tr>
                <tr>
                  <td>{this.state.users[1].id}</td>
                  <td>{this.state.users[1].username}</td>
                  <td>{this.state.users[1].email}</td>
                  <td>{this.state.users[1].balance}</td>
                  <td>{this.state.users[1].createdAt}</td>
                </tr>
              </tbody>
            </table>
          </BoxView>
        </div>
      </PageView>
    );
  }
}
