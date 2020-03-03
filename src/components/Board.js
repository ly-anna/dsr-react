import React from 'react'
import Square from './Square'

/* функциональный компонент */

const Board = ({ squares, onClick }) => (
  <div className='board'>
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);


  export default Board;

