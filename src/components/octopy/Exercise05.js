import React, { Component } from 'react';
import PageView from '../../components/layout/PageView';
import List from '../../components/list/List';

const imageUrls = [
  'https://example.com/url01',
  'https://example.com/url02',
  'https://example.com/url03',
  'https://example.com/url04',
  'https://example.com/url05'
];

export default class Exercise05 extends Component {
  render() {
    const instructions = [
      <span>Usa cinco imágenes de internet de tu elección y reemplaza el arreglo imageUrls con sus respectivas urls.</span>,
      <span>Muestra una de las imágenes en el elemento img.</span>,
      <span>Escribe el código para que los botones permitan recorrer el arreglo de urls y que el elemento img vaya actualizando la imagen que se muestra como si fuera una galería (image slider/carousel).</span>
    ];
    return (
      <PageView title="Exercise 5" subtitle="">
        <List list={instructions} />
        <hr style={{ color: '#3498db', backgroundColor: '#3498db', height: 1 }} />
        
        <div>
          <div>
            <img />
          </div>
          <div>
            <button>Anterior</button>
            <button>Siguiente</button>
          </div>
        </div>
      </PageView>
    );
  }
}
