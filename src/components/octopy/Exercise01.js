import React, { Component } from 'react';
import PageView from '../../components/layout/PageView';
import List from '../../components/list/List';

export default class Exercise01 extends Component {
  render() {
    const instructions = [
      <span>Escribe el código para que el elemento input permita elegir sólo imágenes.</span>,
      <span>Al seleccionar una imagen esta se debe mostrar en el elemento img.</span>,
      <span>Usa estilos para que la imagen siempre mida 640 píxeles de largo por 360 píxeles de ancho sin importar si se distorsiona.</span>,
      <span>Manteniendo el tamaño zdel elemento img, usa estilos para hacer que la imagen se muestre completa y sin distorsiones, es decir, a escala. *</span>,
      <span>Rellena el espacio sobrante del elemento img con color negro y centra la imagen. *</span>
    ];
    return (
      <PageView title="Exercise 1" subtitle="">
        <List list={instructions} />
        <hr style={{ color: '#3498db', backgroundColor: '#3498db', height: 1 }} />
        
        <div>
          <img />
          <input type="file" />
        </div>
      </PageView>
    );
  }
}