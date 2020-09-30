import React from 'react'

const StepButton = (props) => {
  return(
    <button type={props.type} name={props.action} onClick={props.handleClick}>
      {props.action}
    </button>
  )
}

export default StepButton