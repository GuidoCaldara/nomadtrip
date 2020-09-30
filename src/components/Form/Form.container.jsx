import React, { Component } from 'react';  
import DateInput from './FormComponents/DateInput/DateInput.component'
import FormCard from './FormComponents/FormCardComponent/FormCard.component'
import LocationInput from './FormComponents/LocationInput/LocationInput.component'
import { daysBetween } from '../../helpers/helpers'
import Passengers from './FormComponents/Passengers/Passengers.component'
import RouteInput from './FormComponents/Route/RouteInput.component'
import { connect } from 'react-redux';
import './FormStyle.scss'
import { generateCardHeadline } from './FormHelpers/FormHelpers'




class FormContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      departureFrom: '',
      departureTo: '',
      returnFrom: '',
      returnTo: '',
      adults: 1,
      step: 4,
      departureAirport: '',
      returnAirport: '',
      // stops: [{id: 1,city: "New Yord", country: "US", minDays: 4, maxDays: 8}, {id: 2,city: "New Yord", country: "US", minDays: 4, maxDays: 8}, {id: 3,city: "New Yord", country: "US", minDays: 4, maxDays: 8}],
      stops: [],
      nextId: 1,
      showDepArr:  true
    }
  }

  generateBodyRequest = (datas) => {
    const request = datas.stops.map((stop)=>{
      return { locations: [stop.airportCode], nights_range: [stop.minDays, stop.maxDays] }
    })
    return {"via" : request}
  }
  
  
  
  handleSumbit  = async (e) =>{
    e.preventDefault()
    this.props.dispatch({ type: 'START_FETCH' });
    const data = this.generateBodyRequest(this.state)
    console.log(data)
    const url = `https://api.skypicker.com/traveling_salesman?adults=${this.state.adults}&children=0&infants=0&v=3&curr=EUR&locale=en&lang=en&xml=0&partner=picky&partner_market=it&sort=price&asc=1&limit=1&date_from=${this.state.departureFrom}&date_to=${this.state.departureTo}&return_from=${this.state.returnFrom}&return_to=${this.state.returnTo}&selected_airlines=null&selected_airlines_exclude=False&fly_from=${this.state.departureAirport}&fly_to=${this.state.returnAirport}&conn_on_diff_airport=1&max_stopovers=1`
    console.log(url)
    const response = await fetch(url, {
       method: 'POST',
       body: JSON.stringify(data),
     });
    const results = await response.json();
    this.props.dispatch({ type: 'UPDATE', payload: results });
    setTimeout(()=>{
      this.props.dispatch({ type: 'STOP_FETCH' });
    }, 1500)
  }
  
  
  setDate = (dates, name) =>{
    this.setState({
      [`${name}From`]: dates[0],
      [`${name}To`]: dates[1],
    })
  }

  setAirport = (code, name, city) => {
    this.setState({
      [`${name}Airport`]: code 
    })
  }

  setAdults = (n) =>{
    this.setState({
     adults: n 
    })
  }


  addStop = (stop) =>{
    document.querySelector(".location-stop-input input").value = ""
    const stops = this.state.stops
    stops.push(stop)
    this.setState({
      stops: stops,
      nextId: this.state.nextId + 1
    })
  }

  removeStop = (e) => {
   const id = parseInt(e.currentTarget.dataset.id)
   const stops = this.state.stops
   const newStops = stops.filter(stop => stop.id !== id)

   this.setState({
     stops: newStops
   })
  }

  showStops = () => {
    return(
    this.state.departureFrom !== '' && 
    this.state.departureTo !== '' && 
    this.state.returnFrom !== '' && 
    this.state.returnTo !== ''
    )
  }

  displayPassenger = () => {
    return true
  //  return (this.state.departureAirport !== '' && 
  //   this.state.returnAirport !== '' && 
  //   this.state.departureFrom !== '' && 
  //   this.state.departureTo !== '' && 
  //   this.state.returnFrom !== '' && 
  //   this.state.returnTo !== '')
  }

  showSubmitBtn = () =>{
    return true
    //return (this.displayPassenger() && this.state.showStops && this.state.stops.length > 0)
  }
  
  convertDate = (dateString) => {
    var dateParts = dateString.split("/");
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    return dateObject.getTime()
  } 

  changeStep = (e) =>{
    const step = this.state.step
    const newStep = e.target.name === "next" ? step + 1 : step - 1
    this.setState({ 
      step: newStep
    })
  }

  render(){
  
    const tripDates = {
      Dd: this.state.departureFrom, 
      DD: this.state.departureTo,
      Aa: this.state.returnFrom,
      AA: this.state.returnTo
    }

    const tripDays = Object.values(tripDates).map( d => this.convertDate(d) / 1000 )
    const minTripDays = daysBetween(tripDays[1], tripDays[2])
    const maxTripDays = daysBetween(tripDays[0], tripDays[3])
    const headline = generateCardHeadline(this.state.step, minTripDays, maxTripDays)
  
    let page;
    if (this.state.step === 1){
      page = ["departure", "return"].map((a, i) => <DateInput key={i} name={a} minDate={this.state.departureTo} handleChange={this.setDate}/>)
    } else if (this.state.step === 2){
      page =   <RouteInput
                dates={tripDates}
                removeStop={this.removeStop}
                stops={this.state.stops}
                handleClick={this.addStop}
                id={this.state.nextId}
                />
    } else if (this.state.step === 3){
      page = ["departure", "return"].map((a, i) => <LocationInput key={i} handleChange={this.setAirport} name={a}/>)
       

    } else if (this.state.step === 4){
       page = <Passengers
                onChange={this.setAdults}
                />
    }
    

    return(
      <div className="form-container">
        <FormCard
          headline= {headline}
          step={this.state.step}
          handleClick={this.changeStep}
          content={page}
        />
      </div>
    ) 
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
    loading: state.loading
  };
}

export default connect(mapStateToProps)(FormContainer);

