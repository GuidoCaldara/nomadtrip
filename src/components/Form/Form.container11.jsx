import React, { Component } from 'react';
import DateRangeInput from './FormComponents/DateInput/DateInput.component'
import LocationInput from './FormComponents/LocationInput.component'
import AdultsInput from './FormComponents/AdultsInput.component'
import StopInputForm from './FormComponents/StopInputForm.component'
import StopDetails from './FormComponents/StopDetails.component'
import FormInputContainer from './FormComponents/FormInputContainer.component'
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'




class FormContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      departureFrom: '10/01/2020',
      departureTo: '13/01/2020',
      returnFrom: '20/01/2020',
      returnTo: '23/01/2020',
      adults: 1,
      departureAirport: '',
      returnAirport: '',
      stops: [{city: "New Yord", country: "US", minDays: 4, maxDays: 8}, {city: "New Yord", country: "US", minDays: 4, maxDays: 8}, {city: "New Yord", country: "US", minDays: 4, maxDays: 8}],
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
    }, () =>{
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

  render(){

    const tripDates = {
      Dd: this.state.departureFrom,
      DD: this.state.departureTo,
      Aa: this.state.returnFrom,
      AA: this.state.returnTo
    }

    return(
      <div className='container py-5'>

        <div className="row">
          <div className="col-lg-10 mx-auto">
          <form onSubmit={this.handleSubmit}>
            <div className="p-5 card form-card">
              <h6><strong>Select the dates</strong></h6>
              <p className="mb-3 small text-muted">Let's start selecting the dates of your trip. Choose a range of dates for your departure and a range for your return</p>
              <div className="row">
                <div className="col-md-6">
                <FormInputContainer
                  input={
                    <DateRangeInput
                      inputIcon = {<FontAwesomeIcon icon={faCalendar} />}
                      placeholder="Departure dates"
                      handleChange={this.setDate}
                      defaultDate={[this.state.departureFrom, this.state.departureTo]}
                      name="departure"
                    />
                  }
                />
                </div>
                <div className="col-md-6">
                  <FormInputContainer
                    input={
                      <DateRangeInput
                        inputIcon = {<FontAwesomeIcon icon={faCalendar} />}
                        placeholder="return dates"
                        handleChange={this.setDate}
                        minDate={this.state.departureTo}
                        defaultDate={[this.state.departureFrom, this.state.departureTo]}
                        name="return"
                      />
                    }
                  />
                </div>
              </div>
            </div>
            {
              (this.showStops()) ?
              <div className="p-5 card form-card mt-4">
                <StopInputForm
                  dates={tripDates}
                  handleClick={this.addStop}
                  id={this.state.nextId}
                  />
                  <div className="stops-container mt-4">
                  {this.state.stops.map((stop)=>{
                  return <StopDetails
                        key={stop.id}
                        country={stop.country}
                        stop={stop}
                        removeStop={this.removeStop}
                        />
                  })}
                  </div>
                  </div>

                  : ''
                }


                { ((this.state.stops.length >= 1) && (!this.state.showDepArr )) ?
                  (
                      <div className="py-4 d-flex justify-content-end align-items-center">
                        <p className="mb-0">Did you add all the cities you'd like to visit? Click here</p>
                  <button className="ml-4" type="button" onClick={() => (this.setState({showDepArr: true}))}>Next</button>
                  </div>) :
                  ''
                }


              { this.state.showDepArr  ?
                (

                  <div className="p-5 card form-card mt-4">

                <div className="">
                <h6><strong>Departure and return</strong></h6>
                <p className="mb-4 small text-muted">Choose where you'd like to start and end your trip.</p>
                <div className="row">
                  <div className="col-md-6">
                    <FormInputContainer
                      label="When would you like to depart"
                      subtitle="Choose a range of dates"
                      input={
                        <LocationInput
                            inputIcon = {<FontAwesomeIcon icon={faPlaneDeparture} />}
                            placeholder={"Departure City"}
                            name="departure"
                            handleChange={this.setAirport}
                          />
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <FormInputContainer
                      label="When would you like to depart"
                      subtitle="Choose a range of dates"
                      input={
                        <LocationInput
                          inputIcon = {<FontAwesomeIcon icon={faPlaneArrival} />}
                          placeholder="return City"
                          name="return"
                          handleChange={this.setAirport}
                        />
                      }
                    />
                  </div>
                </div>
                </div></div>
                ) : ''
              }



              {
                (this.displayPassenger()) ?
                <div className="p-5 card form-card mt-4">
                  <AdultsInput
                    handleSubmit={this.handleSumbit}
                    setAdults={this.setAdults}
                    showStops={this.showStops}/>
                </div>
                  : ''
              }


              </form>
          </div>
        </div>
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

