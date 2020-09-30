import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons'
import { timeConverter } from '../../helpers/helpers'

const CitiesConnection = (props) =>{

  const departureTime = timeConverter(props.route.dTime)
  const arrivalTime = timeConverter(props.route.aTime)
  
  return(
    <div className="cities-connection">
    <div className="city-info">
      <h5>{props.route.cityFrom}</h5>
      <p className="mb-0"><strong>{props.route.flyFrom}</strong></p>
      <div className="time-info">
        <FontAwesomeIcon className="mb-2" icon={faPlaneDeparture} /> 
        <p className="small text-muted mb-0">{departureTime.day}</p> 
        <p className="small text-muted mb-0">{departureTime.hour}</p> 
      </div>
    </div>
    <div className="airplane-box">
      <hr/>
      <FontAwesomeIcon icon={faPlane} className="mb-3" size="lg" />
      <p className="text-center mb-1 mt-3">Flight Duration: {props.route.fly_duration}</p>
      <p className="small text-muted"> {props.route.route.length} flights route</p> 
    </div>
    <div className="city-info">
      <h5>{props.route.cityTo}</h5>
      <p className="mb-0"><strong>{props.route.flyTo}</strong></p>
      <div className="time-info">
        <FontAwesomeIcon className="mb-2" icon={faPlaneArrival}  /> 
        <p className="small text-muted mb-0">{arrivalTime.day}</p> 
        <p className="small text-muted mb-0">{arrivalTime.hour}</p> 
      </div>
    </div> 
  </div>
  )
}


export default CitiesConnection