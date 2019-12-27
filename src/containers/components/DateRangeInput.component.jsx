import 'flatpickr/dist/flatpickr.css'
import './formComponents.scss';
import Flatpickr from 'react-flatpickr'

import  React  from 'react'

const DateRangeInput = (props) => {

  const convertDate = (date) =>{
    return date.map((date) => {
      let dateConverted = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
      dateConverted = dateConverted.toISOString().split("T")[0].split("-")
      return `${dateConverted[2]}/${dateConverted[1]}/${dateConverted[0]}`
    })
  }
  

  const handleChange = (e, name) =>{
    if (e.length < 2) return
    props.handleChange(convertDate(e), name )
  }

  return(
    <div className="d-flex align-items-center">
      {props.inputIcon}
      <Flatpickr
        className="form-input"
        name={props.name}
        placeholder= {props.placeholder}
        options={{
          mode: "range",
          minDate: props.minDate,
          dateFormat: "d/m/Y",
          defaultDate: props.defaultDate
        }}
        onChange={(e) => ( handleChange(e, props.name) )} />
    </div>
  )
}

export default DateRangeInput