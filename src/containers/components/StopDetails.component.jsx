import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import ReactCountryFlag from "react-country-flag"

const StopDetails = (props) =>{
  return(
    <div className="stop-detail-box">
    <ReactCountryFlag
    countryCode={props.country}
    svg
    style={{
        width: '1em',
        height: '1em',
    }}
    title={props.country}
/>
      <span className="ml-2 mr-3">From <strong>{props.stop.minDays}</strong> to <strong>{props.stop.maxDays}</strong> days in <strong>{props.stop.city}</strong> </span>
      <FontAwesomeIcon data-id={props.stop.id} className="delete-stop-btn" icon={faTimesCircle} onClick={props.removeStop} />
    </div>
  )
}

export default StopDetails