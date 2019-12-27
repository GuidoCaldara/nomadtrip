import React from 'react'
import { daysBetween } from '../../helpers/helpers'
import LocationInput from './LocationInput.component'


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


  // getAirportCode = async (city) =>{
  //   if (city.includes("London")) return "LHR"
  //   const url = `https://api.skypicker.com/locations?term=${city}&locale=en-US&location_types=airport&limit=5&active_only=true&sort=name`
  //   debugger
  //   const response = await fetch(url, {
  //       method: 'GET'
  //     });
  //   const responseObject = await response.json();
  //   return await responseObject.locations[0].city.code
  // }

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
    const tripDays = Object.values(this.props.dates).map( d => this.convertDate(d) / 1000 )
    const minTripDays = daysBetween(tripDays[1], tripDays[2])
    const maxTripDays = daysBetween(tripDays[0], tripDays[3])

    return(
      <div>
      <h6><strong>Cool! You'll have from {minTripDays} to {maxTripDays} on the trip. Let's set the itinerary</strong></h6>
        <p className="small text-muted mb-4">Enter all the cities you'd like to visit during your trip. Choose the minimum and the maximum amount of days you'd like to spend there. We'll calculate the best air fare </p>
          <div className="stop-form" name={this.props.id}>
            <div className="location-stop-input">
              <LocationInput
                placeholder="ex. New York"
                className="itinerary-location"
                value={this.state.minDays}
                handleChange={this.setCity}
              />
            </div>
            <div className="duration-box">
              <input placeholder="Min days" className="form-input" min="1" value={this.state.minDays} onChange={(e)=>{this.setState({minDays: e.target.value})} }/>
            </div>
            <div className="duration-box">
              <input placeholder="Max days" className="form-input" min="1" value={this.state.maxDays} onChange={(e)=>{this.setState({maxDays: e.target.value})} }/>
            </div>
            <div>
              <button className="btn-circle btn-xl" onClick={this.submitForm} type="submit">+</button>
            </div>
          </div>
      </div>
    )
  }
}

export default StopInputForm