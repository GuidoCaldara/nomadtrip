import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

class AdultsInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      adults: 0
    }
  }

  updateAdults = (e) =>{
    e.preventDefault()
    const adults = e.target.dataset.type === "add" ? this.state.adults + 1 : this.state.adults - 1
    if (adults < 1) return  
    this.setState({
      adults: adults
    }, () => {
      this.props.setAdults(this.state.adults)
    })
  }


  render(){
    return(
      <div className="row passengers-box justify-content-between">
      <div className="col-md-7 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">How many Passengers?</h6>
          <div className="buttons-container">
            <button className="btn-circle" data-type="add" onClick={this.updateAdults}>+</button>
            <button className="btn-circle" data-type="remove" onClick={this.updateAdults}>-</button>
          </div>
          <input
            className="form-input"
            readOnly
            value={this.state.adults}
          />
        </div>
      </div>
      <div className="col-md-4 px-3">
        {
          this.state.adults > 0 ?  
            (<button className="itinerary-btn" onClick={this.props.handleSubmit}>
                Let's Search!
                <FontAwesomeIcon icon={faPlane} className="mx-1" />
              </button>) :
            (<div></div>)
        }
      </div>

      </div>
    )
  }
}


export default AdultsInput

