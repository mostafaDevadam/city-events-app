import React from 'react'
import DefaultInputField from './DefaultInputField'

// field: type, name, id, style: width, height, color, 
const DefaultForm = ({fields, title_form, handleSubmit}) => {
  return (
    <div>DefaultForm


      {fields && fields.map((field_name, index) => (
        <DefaultInputField field_name={field_name} />
      ))}
    </div>
  )
}

export default DefaultForm
