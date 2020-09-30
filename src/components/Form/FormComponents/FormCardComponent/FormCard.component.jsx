import React from 'react'
import StepButton from '../StepButton/StepButton.component'
import './FormCard.style.scss'

const FormCard = (props) => {

  const prev = "prev"
  const next = "next"
  console.log(props)
  return(
    <div className="form-card">
    <h3>{props.headline.title}</h3>
    <p>{props.headline.subtitle}</p>
    <div className={"inputs" + ([1,3,4].includes(props.step) ? ' flex' : '')}>
        {props.content}
      </div>
      <div className="buttons">
      <div>
        {
          props.step === 1 ? null : <StepButton handleClick={props.handleClick} type="button" name={prev} action={prev}/>
        }
      </div>
      <div>
        {
          props.step === 4 ? 
          <StepButton handleClick={props.handleSubmit} type="submit" name="submit" action="Search"/>
          : <StepButton handleClick={props.handleClick} type="button" name={next} action={next}/>
        }
      </div>
        
        
      </div>
    </div>
  )
}

export default FormCard