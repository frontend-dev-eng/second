import React from 'react'
import { CustomTextInput } from './CustomTextInput'
import { IconButton, TextField } from '@mui/material'

const CustomSearchBar = (props) => {
  const { inputId = '', placeholder,handleSearchUser,onChange,icon,value } = props
  console.log(`CustomSearchBar props:`, props)

   return (
    <TextField
        id={inputId}
        className="search-input"
        placeholder={placeholder}
        value={value}
        type={'text'}
        onChange={(e) => onChange(e)}
        InputProps={{
            startAdornment:
                <IconButton
                    onClick={handleSearchUser}
                >
                    {icon}
                </IconButton>,
            style : {borderRadius : '8px',paddingLeft : '0px'},
        }}
    />
  )
}

export default CustomSearchBar
