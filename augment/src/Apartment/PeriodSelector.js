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
    props.setPeriod(event.target.value)
  };


  return (
    <div>
      
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="Period-label">
            Period
        </InputLabel>
        <Select
          labelId="period-select"
          id="period-select"
          value={props.period}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
            <MenuItem value="1hr">
                <em>1hr</em>
            </MenuItem>
            <MenuItem value="3hrs">
                <em>3hrs</em>
            </MenuItem>
            <MenuItem value="6hrs">
                <em>6hrs</em>
            </MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}
