import React from 'react';
import PlacesAutocomplete from './PlacesAutocomplete.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons'

 const LocationInput = (props) => {
  let icon;
  if (props.name === "departure"){
    icon = <FontAwesomeIcon icon={faPlaneArrival} />
  } else {
    icon = <FontAwesomeIcon icon={faPlaneDeparture} />
  }
  return (
        <PlacesAutocomplete
          inputIcon = {icon}
          name={props.name}
          className="form-input"
          placeholder={props.placeholder}
          style={{width: '90%'}}
          handleChange={props.handleChange}
          types={['(cities)']}
        />
);
}


export default LocationInput

