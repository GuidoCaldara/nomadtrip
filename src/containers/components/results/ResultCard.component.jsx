import React from 'react'
import RouteDetail from './RouteDetail.component'
import TripSummary from './TripSummary.component'

const ResultCard = (props) =>{

  return(
    <div>
      <h4>Here are the details of your trip</h4>
      <TripSummary trip={props.route}/>
      <p>Total price for the ticket: { props.price }€</p>
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <a href={props.link} rel="noopener noreferrer" target="_blank">Link to the booking</a>
          { props.route.map((r, i)=>{
            return <RouteDetail key={i} step={i} route={r}/>
          }) } 
        </div>
      </div>
    </div>
  )
}


export default ResultCard
