import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function ScrollOption({label,value,handleChange}) {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" name="position" value={value} onChange={handleChange} row>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label={label}
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
  );
}

export default ScrollOption;
