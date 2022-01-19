import React from 'react'

const Filter = ({value, onChange}) => {
    return (
    <div>
      filter names containing
      <input
        value = {value}
        onChange = {onChange}
      />
    </div>
    )
  }

export default Filter