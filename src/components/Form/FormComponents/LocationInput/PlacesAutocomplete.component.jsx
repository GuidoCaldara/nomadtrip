import React from 'react';
import Autocomplete from 'react-google-autocomplete';


 const PlacesAutocomplete = (props) => {

  const getAirportCode = async (city) =>{
    const url = `https://api.skypicker.com/locations?term=${city}&locale=en-US&limit=5&active_only=true&sort=name`
    const response = await fetch(url, {
        method: 'GET'
      });

    const responseObject = await response.json();
    try {
      return {code: responseObject.locations[0].code, country: responseObject.locations[0].country.id}
    } catch (error) {
      alert("No Airport There")
      return undefined
    }
  }

  const handleChange = async (e, name = '') =>{
    const city = e.address_components[0].long_name
    const data = await getAirportCode(city)
    if (data) props.handleChange(data.code, data.country, name, city)
  }



  return (
    <div className="form-wrapper">
    {props.inputIcon}
      <Autocomplete
        name={props.name}
        placeholder={props.placeholder}
        style={{width: '90%'}}
        onPlaceSelected={(e) => { handleChange(e, props.name) }}
        types={['(cities)']}
      />
    </div>
  );
}


export default PlacesAutocomplete

