import React from 'react'
import "./styles.css"

function Button({text,disabled, onClick, blue}) {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} onClick={onClick} disabled={disabled}>
        {text}
        
    </div>
  )
}

export default Button