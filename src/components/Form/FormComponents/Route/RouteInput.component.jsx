import React from 'react'
import './Route.style.scss'
import Autocomplete from '../LocationInput/PlacesAutocomplete.component'
import RouteDetails from './RouteDetails.component'

class StopInputForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      city: '',
      airportCode: '',
      minDays: '',
      country: '',
      maxDays: ''
    }
  }


  setCity = (code, country, name, city) =>{
    this.setState({
      city: city,
      country: country,
      airportCode: code
    })
  }

  submitForm = (e) =>{
    e.preventDefault();
    const stop = this.state
    stop.id = this.props.id
    this.props.handleClick(this.state)
    this.setState(
      {
        city: '',
        airportCode: '',
        minDays: '',
        maxDays: ''
      }
    )
  }

  convertDate = (dateString) => {
    var dateParts = dateString.split("/");
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    return dateObject.getTime()
  } 


  render(){
    return(
      <div>
      <div className="route-details">
          <div className="stop-form" name={this.props.id}>
            <div className="location-stop-input">
              <Autocomplete
                placeholder="ex. New York"
                className="itinerary-location"
                value={this.state.minDays}
                handleChange={this.setCity}
              />
            </div>
            <div className="duration-stop-inputs">
            <input placeholder="Min days" className="form-input" min="1" value={this.state.minDays} onChange={(e)=>{this.setState({minDays: e.target.value})} }/>
            <input placeholder="Max days" className="form-input" min="1" value={this.state.maxDays} onChange={(e)=>{this.setState({maxDays: e.target.value})} }/>
            </div>
          </div>
          <div className="submit-box">
            <button className="btn-circle btn-xl" onClick={this.submitForm} type="submit">+</button>
          </div>
          </div>
          <div className="trip-stops">
            {this.props.stops.map((stop)=>{
              return <RouteDetails 
                    key={stop.id} 
                    country={stop.country}
                    stop={stop} 
                    removeStop={this.props.removeStop}
                    />
              })}
              </div>
            </div>
    )
  }
}

export default StopInputForm