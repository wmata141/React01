import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const squareStyleRed = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': 'red',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const squareStyleBlue = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': 'blue',
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const Square = ({ matrix, id, presBoton }) => {
  let letra = ''
  if (matrix[id] === 1) {
    letra = 'X'
  }
  if (matrix[id] === -1) {
    letra = 'Y'
  }

  return (
    <div
      className="square"
      style={squareStyle}
      onClick={presBoton}>
      <h1>{letra}</h1>
    </div>
  );

}

const Board = () => {
  const [matrix, setMatrix] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState(1);

  useEffect(() => {
    verificar()
  }, [turn])

  const presBoton = (index) => {
    console.log(index)
    if (matrix[index] === 0) {
      if (turn === 1) {
        matrix[index] = 1
        setTurn(0)
      } else {
        matrix[index] = -1
        setTurn(1)
      }      
    }
  }

  const verificar = () => {
    const fila1 = Boolean(matrix[0] === 1 && matrix[1] === 1 && matrix[2] === 1) || (matrix[0] === -1 && matrix[1] === -1 && matrix[2] === -1)
    const fila2 = Boolean(matrix[3] === 1 && matrix[4] === 1 && matrix[5] === 1) || (matrix[3] === -1 && matrix[4] === -1 && matrix[5] === -1)
    const fila3 = Boolean(matrix[6] === 1 && matrix[7] === 1 && matrix[8] === 1) || (matrix[6] === -1 && matrix[7] === -1 && matrix[8] === -1)

    const columna1 = Boolean(matrix[0] === 1 && matrix[3] === 1 && matrix[6] === 1) || (matrix[0] === -1 && matrix[3] === -1 && matrix[6] === -1)
    const columna2 = Boolean(matrix[1] === 1 && matrix[4] === 1 && matrix[7] === 1) || (matrix[1] === -1 && matrix[4] === -1 && matrix[7] === -1)
    const columna3 = Boolean(matrix[2] === 1 && matrix[5] === 1 && matrix[8] === 1) || (matrix[2] === -1 && matrix[5] === -1 && matrix[8] === -1)

    const diagonal1 = Boolean(matrix[0] === 1 && matrix[4] === 1 && matrix[8] === 1) || (matrix[0] === -1 && matrix[4] === -1 && matrix[8] === -1)
    const diagonal2 = Boolean(matrix[2] === 1 && matrix[4] === 1 && matrix[6] === 1) || (matrix[2] === -1 && matrix[4] === -1 && matrix[6] === -1)

    if (fila1 || fila2 || fila3 || columna1 || columna2 || columna3 || diagonal1 || diagonal2) {
      alert("Gano el jugador numero", turn)
      setMatrix([0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>Next player: X</div>
      <div className="winner" style={instructionsStyle}>Winner: None</div>
      <button style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square matrix={matrix} id={0} presBoton={() => presBoton(0)} />
          <Square matrix={matrix} id={1} presBoton={() => presBoton(1)} />
          <Square matrix={matrix} id={2} presBoton={() => presBoton(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square matrix={matrix} id={3} presBoton={() => presBoton(3)} />
          <Square matrix={matrix} id={4} presBoton={() => presBoton(4)} />
          <Square matrix={matrix} id={5} presBoton={() => presBoton(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square matrix={matrix} id={6} presBoton={() => presBoton(6)} />
          <Square matrix={matrix} id={7} presBoton={() => presBoton(7)} />
          <Square matrix={matrix} id={8} presBoton={() => presBoton(8)} />
        </div>
      </div>
    </div>
  );
}

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;