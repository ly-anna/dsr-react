import React from 'react'

/* функциональный компонент кнопка подсказки */
// value и onClick  - деструктуризация props

const HintButton = ({onClick}) => {
  return (
    <button 
    className='hint waves-effect waves-light btn-small'
    onClick={onClick}
    >
      Get a hint!
    </button>
  )
}

export default HintButton;