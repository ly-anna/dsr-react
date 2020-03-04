import React from 'react'

// функциональный компонент
// value и onClick  - деструктуризация props
const Square = ({value, onClick}) => {
    return (
      <button 
      className='square waves-effect waves-teal btn-flat'
      onClick={onClick}
      >
        {value}
      </button>
    )
  }

export default Square;

