import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import Autocomplete from 'react-google-autocomplete';
import scriptLoader from 'react-async-script-loader';


 const LocationInput = (props) => {

  const getAirportCode = async (city) =>{
    const url = `https://api.skypicker.com/locations?term=${city}&locale=en-US&limit=5&active_only=true&sort=name`
    const response = await fetch(url, {
        method: 'GET'
      });

    const responseObject = await response.json();
    debugger
    return await {code: responseObject.locations[0].code, country: responseObject.locations[0].country.id}
  }

  const handleChange = async (e, name = '') =>{
    debugger
    const city = e.address_components[0].long_name
    const data = await getAirportCode(city)
    props.handleChange(data.code, data.country, name, city)
  }



  return (
    <div>

    {props.inputIcon}
    <Autocomplete
      name={props.name}
      className="form-input"
      placeholder={props.placeholder}
      style={{width: '90%'}}
      onPlaceSelected={(e) => { handleChange(e, props.name) }}
    types={['(cities)']}
/>

  </div>
  );
}


export default LocationInput

