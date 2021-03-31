import React, { Component } from 'react';
import PageView from '../../components/layout/PageView';
import List from '../../components/list/List';

const data = [
  { d: 'monday', v: 35 },
  { d: 'tuesday', v: 92 },
  { d: 'wednesday', v: 56 },
  { d: 'thursday', v: 81 },
  { d: 'friday', v: 89 },
  { d: 'saturday', v: 11 },
  { d: 'sunday', v: 31 }
];

const data2 = [
  { d: 'monday', v: 3686 },
  { d: 'tuesday', v: 2295 },
  { d: 'wednesday', v: 6958 },
  { d: 'thursday', v: 4910 },
  { d: 'friday', v: 3873 },
  { d: 'saturday', v: 5988 },
  { d: 'sunday', v: 4268 }
];

export default class Exercise06 extends Component {
  render() {
    const instructions = [
      <span>Muestra los datos del arreglo data en forma de una gráfico de barras donde el eje X representa los días y el eje Y representa las consultas realizadas ese día.</span>,
      <span>Al igual que en el paso anterior, muestra el gráfico data2 pero esta vez como un gráfico de líneas. *</span>,
      <span>Si usaste el atributo "id" de html en alguna parte de tu código, eliminalo manteniendo la funcionalidad. *</span>
    ];
    return (
      <PageView title="Exercise 6" subtitle="">
        <List list={instructions} />
        <hr style={{ color: '#3498db', backgroundColor: '#3498db', height: 1 }} />
        
        <div>
          {/* Gráfico de barras de data aquí */}
        </div>
        <div>
          {/* Gráfico de barras de data2 aquí */}
        </div>
      </PageView>
    );
  }
}
