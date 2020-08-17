import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
    const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString());

    const handleDateChange = date => {
        setSelectedDate(date);
        props.setTime(date.getTime())
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <DateTimePicker
                    margin="normal"
                    id="date"
                    label={props.label}
                    format="MM/dd/yyyy HH:mm:ss"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
