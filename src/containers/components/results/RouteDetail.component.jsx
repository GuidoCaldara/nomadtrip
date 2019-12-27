import React from 'react'
import './resultsComponents.scss'
import  CitiesConnection from './CitiesConnection.component'
import  FlightDetails from './FlightDetails.component'

const RouteDetail = (props) =>{

  const ordinals = () => ["First", "Second", "Thirds", "Fourth", "Fifth", "Sixth"]
  

  return(
    <div className="flight-details-card">
      <h6>{ordinals()[props.step]} route</h6>
        <CitiesConnection route={props.route}/>
        <FlightDetails route={props.route}/>
    </div>
  )
}


export default RouteDetail
