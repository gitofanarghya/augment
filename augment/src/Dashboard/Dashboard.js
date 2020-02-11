import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CompanySelector from './CompanySelector'
import CenterSelector from './CenterSelector'
import { Card, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    cardContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    card: {
        width: '22%',
        margin: 10,
        padding: 10
    }
  }));

export default function Dashboard(props) {

    const classes = useStyles();

    return (
            <div className={classes.root}>

                <CompanySelector company={props.companyName} org={props.org} setCompany={props.setCompany}/>
                <CenterSelector center={props.center} company={props.company} setCenter={props.setCenter}/>
                <div className={classes.cardContainer}>
                    {
                        props.center !== '' && props.company.centers.filter(c => c.name === props.center)[0].apartments.map(u => 
                            
                            <Card className={classes.card} key={u.name}>
                                <div style={{display: 'flex'}}>    
                                    <div style={{width: '70%'}}>
                                        <div style={{color: '#54aab3'}}>    
                                            {u.name}
                                        </div>
                                        <div style={{color: '#545477'}}>
                                            {u.resident.name}
                                        </div>
                                    </div>
                                    <div style={{width: '30%', background: u.softNotifications.length !== 0  ? u.softNotifications.filter(s => s.type==='currentLocation')[0].name === 'bedroom' ? 'url(sleeping.png)' : 'url(occupied.png)' : 'url(occupied.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
                                        
                                    </div>
                                </div>
                                <div style={{display: 'flex', padding: 10, flexDirection: 'column'}}>
                                    <div /* style={{color: u.sofNotifications.indication === 'average' ? 'lightgreen' : u.bathroomVisitsLatestReading.indication === 'above average' ? 'orange' : u.bathroomVisitsLatestReading.indication === 'below average' ? 'orange' : 'red'}} */>
                                        Bathroom Visits - {u.softNotifications.length !== 0 && u.softNotifications.filter(s => s.type==='bathroomVisits')[0].count.toFixed(2)}
                                    </div>
                                    <div /* style={{color: u.activeTimeLatestReading.indication === 'average' ? 'lightgreen' : u.activeTimeLatestReading.indication === 'above average' ? 'orange' : u.activeTimeLatestReading.indication === 'below average' ? 'orange' : 'red'}} */>
                                        Active Time - {u.softNotifications.length !== 0 && u.softNotifications.filter(s => s.type==='activeTime')[0].count.toFixed(2)}
                                    </div>
                                    <div /* style={{color: u.sleepTimeLatestReading.indication === 'average' ? 'lightgreen' : u.sleepTimeLatestReading.indication === 'above average' ? 'orange' : u.sleepTimeLatestReading.indication === 'below average' ? 'orange' : 'red'}} */>
                                        Sleep Time - {u.softNotifications.length !== 0 && u.softNotifications.filter(s => s.type==='sleepTime')[0].count.toFixed(2)}
                                    </div>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                    <Button variant="contained" color="primary" size="small">Call Responder</Button>
                                    <Button variant="text" color="primary" size="small" onClick={() => props.setApartment(u.name)}>Details</Button>
                                </div>
                            </Card>

                            )
                    }
                </div>
                
            </div>
    )

}