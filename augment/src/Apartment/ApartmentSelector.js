import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const handleChange = event => {
    props.setApartment(event.target.value)
  };


  return (
    <div>
      
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="Center-label">
        Apartment
        </InputLabel>
        <Select
          labelId="Center-select"
          id="Center-select"
          value={props.apartment}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          {props.center && props.center.apartments.map(c => <MenuItem key={c.name} value={c.name} disabled={props.apartment === c.name}>{c.name}</MenuItem>)}
        </Select>
        <FormHelperText>Select the apartment</FormHelperText>
      </FormControl>
      
    </div>
  );
}
