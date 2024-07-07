import React from 'react'

const Button = ({ text , onClick, disabled = false}) => {
  return (
    <button className={`w-full text-white bg-button hover:bg-button-hover focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}onClick={onClick} disabled={disabled}>{text}</button>
  )
}

export default Button