import React from 'react'
import {timeConverter, getAirlineName, secondsToHours} from '../../helpers/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import AnimateHeight from 'react-animate-height';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons'

class FlightDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      height: 0
    }
  }

  toggle = () => {
    const height = this.state.height;
 
    this.setState({
      height: height === 0 ? 'auto' : 0,
    });
  };

  render(){
    const { height } = this.state;
    return(
      <div className="flights-details">
      <AnimateHeight
        duration={ 800 }
        height={ height } // see props documentation below
      >
      <div className="details-box">
        {this.props.route.route.map((r, i)=>{
            // if (this.props.route.route.length === 1){
              return (
                <div key={i} className="mb-4">
                  <div className ="flight-details-box">
                    <div className="flight-route-box">
                      <p className="mb-2">{r.cityFrom}({r.flyFrom})</p>
                      <div className="vl"></div> 
                      <p className="mt-1 mb-2">{r.cityTo}({r.flyTo})</p> 
                    </div>
                    <div className="flight-schedule-box">
                    <p className="mb-1">Flight {r.airline} {r.flight_no}</p>
                      <div className="flight-number-info mb-1">
                        <img className="mr-2" alt="logo" src={`https:images.kiwi.com/airlines/128x128/${r.airline}.png`} width="25"/>
                        <p className="mb-0"> {getAirlineName(r.airline)}</p>
                    </div>

                      <div className="mb-1">
                        <FontAwesomeIcon className="mr-2" icon={faPlaneDeparture} />  
                        {timeConverter(r.dTime).day} - {timeConverter(r.dTime).hour}
                      </div>
                      <div className="mb-2">
                        <FontAwesomeIcon className="mr-2" icon={faPlaneArrival} />  
                        {timeConverter(r.aTime).day} - {timeConverter(r.aTime).hour}
                      <div className="mt-2">
                      <p className="mb-2 small text-muted">Flight duration {secondsToHours(r.aTimeUTC - r.dTimeUTC)}</p>
                      </div>  
                  </div>
                  </div>
                  </div>
                  </div>
                  )


            // } else{
              // return (
              //   <div key={i}>
              //   <div className="flight-number-info">
              //   <img alt="logo" src={`https://images.kiwi.com/airlines/128x128/${r.airline}.png`} width="30" />
              //   <p className="mb-0">Flight from: {getAirlineName(r.airline)}-{r.flight_no}</p>
              //   </div>
              //     <p>Flight from: {r.cityFrom}({r.flyFrom}) to {r.cityTo}({r.flyTo})</p>
              //     <p>Departure {timeConverter(r.dTime).day} - {timeConverter(r.dTime).hour}</p>
              //     <p>Arrival {timeConverter(r.aTime).day} - {timeConverter(r.aTime).hour}</p>
              //     <p>Airplane {r.equipment}</p>
              //   </div>
              // )
            //}
        })}
      </div>
      </AnimateHeight>
      <div className="expand-box">
        <FontAwesomeIcon 
          className="mb-2" 
          icon={ height === 0 ?  faAngleDoubleDown : faAngleDoubleUp}
          onClick={this.toggle} 
          size="lg" 
        /> 
      </div>
  </div>
    )

  }
}

export default FlightDetails



// <div className="flight-number-info">
// <img alt="logo" src={`https://images.kiwi.com/airlines/128x128/${r.airline}.png`} width="30"/>
// <p className="mb-0">Flight from: {getAirlineName(r.airline)}-{r.flight_no}</p>
// </div>
// <p>{r.cityFrom} to {r.cityTo}</p>
// <p>Departure {timeConverter(r.dTime).day} - {timeConverter(r.dTime).hour}</p>
// <p>Arrival {timeConverter(r.aTime).day} - {timeConverter(r.aTime).hour}</p>
// <p>Airplane {r.equipment}</p>
