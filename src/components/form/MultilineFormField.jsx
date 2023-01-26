import React from 'react'
import * as _ from 'lodash';
import { InputLabel, TextField,Typography } from '@mui/material'
import '../../styles/sass/main.scss'

const MultilineFormField = ({
  fieldName,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = 'text',
  placeholder,
  fullWidth = false,
  rows = 10
}) => {
  return (
    <React.Fragment>
      <InputLabel
        sx={{ fontWeight: 600, fontSize: 12, marginTop: 1, color: '#000000' }}
        htmlFor={fieldName}
      >
        {_.startCase(fieldName)}
      </InputLabel>
      <TextField
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={(error || helperText) ? <Typography className="list-header" > { helperText} </Typography>  : ''}
        type={type}
        name={fieldName}
        id={fieldName}
        fullWidth={fullWidth}
        multiline
        rows={rows}
        placeholder={placeholder ? placeholder : ''}
        sx={{ borderColor: 'red' }}
      />
    </React.Fragment>
  )
}

export default MultilineFormField
