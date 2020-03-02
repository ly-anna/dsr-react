import React from 'react'


// value и onClick  - деструктуризация props
const Square = ({value, onClick}) => {
    return (
      <button 
      className='square'
      onClick={onClick}
      >
        {value}
      </button>
    )
  }

export default Square;

