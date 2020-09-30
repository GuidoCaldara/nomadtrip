import React from 'react'
import Flatpickr from 'react-flatpickr'


const FlatpickrComponent = (props) =>{



  return(
      <Flatpickr
      name={props.name}
      placeholder= {props.placeholder}
      options={props.options}
      onChange={(e) => props.handleChange(e, props.name)} />
  )
} 

export default FlatpickrComponent