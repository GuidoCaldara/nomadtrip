import 'flatpickr/dist/flatpickr.css'
import '../formComponents.scss';
import FLatpickrComponent from './FlatpickrComponent.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'

import  React  from 'react'

const DateRangeInput = (props) => {


  const convertDate = (dates) =>{
    console.log(dates)
    return dates.map((date) => {
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
    <div className="form-wrapper">
    <FontAwesomeIcon icon={faCalendar} />
      <FLatpickrComponent
        className="form-input"
        name={props.name}
        placeholder= {props.placeholder}
        options={{
          mode: "range",
          minDate: props.minDate,
          dateFormat: "d/m/Y",
          defaultDate: props.defaultDate
        }}
        handleChange={handleChange} />
    </div>
  )
}

export default DateRangeInput