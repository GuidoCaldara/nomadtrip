import React from 'react'
import { daysBetween } from '../../../helpers/helpers.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

const TripSummary = (props) =>{
  console.log(props.trip)
  const trip = props.trip
  return(
    <div className="d-flex justify-content-center flex-wrap align-items-center">
    <div className="d-flex align-items-center justify-content-around flex-grow-1 "> 
      <h5>{trip[0].cityFrom}</h5>
    </div>
    {trip.map((r, i) =>{
      let daysInCity;
      const nextStop = trip[i + 1]
      if (nextStop){
        daysInCity = daysBetween(nextStop.dTimeUTC, r.aTimeUTC)
        return (
          <div className="d-flex align-items-center justify-content-around flex-grow-1 "> 
          <FontAwesomeIcon icon={faPlane} className="mx-4" />
            <div className="d-flex align-items-center">
              <div className="text-center" key={i}>
                <p className="mb-0">{nextStop.cityFrom}</p>
                <p className="mb-1 text-muted small">{daysInCity} days</p>
              </div>
            </div>
          </div>
            )
      }
    })}
    <div className="d-flex align-items-center justify-content-around flex-grow-1 "> 
      <FontAwesomeIcon icon={faPlane} className="mx-4" />
      <h5>{trip[0].cityFrom}</h5>
      </div>
    </div>

  )
}


export default TripSummary
