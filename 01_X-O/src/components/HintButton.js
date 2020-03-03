import React from 'react'

/* функциональный компонент кнопка подсказки */
// value и onClick  - деструктуризация props

const HintButton = ({value, onClick}) => {
  return (
    <button 
    className='hint'
    onClick={onClick}
    >
      Get a hint!
    </button>
  )
}

export default HintButton;