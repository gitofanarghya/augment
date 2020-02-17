import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import CompanySelector from '../Dashboard/CompanySelector'
import CenterSelector from '../Dashboard/CenterSelector'
import ApartmentSelector from './ApartmentSelector'
import PeriodSelector from './PeriodSelector'
import { ActivityGraph } from './MotionGraph'
import { Paper, Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { appService } from '../App/app.service';
import { SleepTime } from './SleepTime';

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    selectors: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    overview: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap'
    },
    personal: {
        display: 'flex',
        margin: '0 10px 0 10px'
    },
    media: {
        width: 100,
        backgroundSize: 'contain'
    },
    notifications: {
        width: 'calc(100% - 200px)',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginRight: 10
    },

})

class Apartment extends React.Component {

    componentDidMount = () => {
    }

    setApartment = (apartment) => {
        this.props.setApartment(apartment)
        this.props.getMotionData(this.props.centerObj.apartments.filter(a => a.name === apartment)[0].hubID, Math.round(Date.now() / 1000) - 3600)
        this.props.notificationDetails(this.props.centerObj.apartments.filter(a => a.name === apartment)[0].hubID)
    }

    setPeriod = (period) => {
        this.props.setPeriod(period)
        if (period === '1hr') {
            this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now() / 1000) - 3600)
        } else if (period === '3hrs') {
            this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now() / 1000) - 10800)
        } else if (period === '6hrs') {
            this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now() / 1000) - 21600)
        } else {
            this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now() / 1000) - 86400)
        }
    }

    timeFormatter = (time) => {
        var decimalTimeString = time;
        var decimalTime = parseFloat(decimalTimeString);
        decimalTime = decimalTime * 60 * 60;
        var hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        var minutes = Math.floor((decimalTime / 60));
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return `${hours} hrs ${minutes} mins`
    }


    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <div className={classes.selectors}>
                    <Button color="primary" onClick={() => this.props.setCenter(this.props.center)}>Back</Button>
                    <CompanySelector company={this.props.company} org={this.props.org} setCompany={this.props.setCompany} />
                    <CenterSelector center={this.props.center} company={this.props.org.filter(c => c.name === this.props.company)[0]} setCenter={this.props.setCenter} />
                    <ApartmentSelector center={this.props.org.filter(c => c.name === this.props.company)[0].centers.filter(c => c.name === this.props.center)[0]} apartment={this.props.apartment} setApartment={this.setApartment} />
                </div>
                <div className={classes.overview}>
                    <Card className={classes.personal}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.apartmentObj.resident.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Age: {this.props.apartmentObj.resident.age}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Guardian: {this.props.apartmentObj.resident.guardianName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Guardian Phone: {this.props.apartmentObj.resident.guardianPhoneNumber}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className={classes.card}>
                        <Typography gutterBottom variant="body2" component="h2" >
                            Active Time
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {this.timeFormatter(this.props.apartmentObj.softNotifications.filter(s => s.type === 'activeTime')[0].count)}
                            </Typography>
                    </Card>

                    <Card className={classes.card}>
                        <Typography gutterBottom variant="body2" component="h2">
                            Bathroom Visits
                                </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {this.props.apartmentObj.softNotifications.filter(s => s.type === 'bathroomVisits')[0].count}
                        </Typography>
                    </Card>

                    <Card className={classes.card}>
                        <Typography gutterBottom variant="body2" component="h2">
                            Sleep Time
                                </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">

                            {this.timeFormatter(this.props.apartmentObj.softNotifications.filter(s => s.type === 'sleepTime')[0].count)}
                            </Typography>
                    </Card>

                    <Card className={classes.card}>
                        <Typography gutterBottom variant="body2" component="h2">
                            Location
                                </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {this.props.apartmentObj.softNotifications.filter(s => s.type === 'currentLocation')[0].name}
                        </Typography>
                    </Card>

                    <Card className={classes.card}>
                        <Typography gutterBottom variant="body2" component="h2" >
                            Status
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            At Home{/* {this.props.apartmentObj.softNotifications.filter(s => s.type === 'activeTime')[0].count} */}
                        </Typography>
                    </Card>

                    <Card className={classes.card}>
                        <Typography gutterBottom variant="body2" component="h2" >
                            Last Contact
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="p">
                            {this.props.apartmentObj.lastContact && Math.round((Date.now() / 1000 - this.props.apartmentObj.lastContact.ts) / 60)} minutes ago
                            </Typography>
                    </Card>


                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Paper style={{ margin: '10px 0 0 10px', width: '50%' }}>
                        <Typography variant='h4' style={{ margin: 10, display: 'flex', justifyContent: 'space-between' }}>
                            Motion Data
                        <PeriodSelector period={this.props.period} setPeriod={this.setPeriod} />
                        </Typography>

                        <div style={{ minWidth: '50%' }}>
                            <ActivityGraph />
                        </div>
                    </Paper>

                    <Paper style={{ margin: 10, width: '50%' }}>
                        <Typography variant='h4' style={{ margin: 10 }}>Sleep Time Trend</Typography>
                        <SleepTime />
                    </Paper>
                </div>


            </div>
        )
    }
}

function mapStateToProps(state) {
    const { org, company, center, apartment, apartmentObj, period, currentPage, centerObj } = state.app

    return {
        org, company, center, apartment, apartmentObj, period, currentPage, centerObj
    }
}

const mapDispatchToProps = (dispatch) => ({

    setCompany: (company) => {
        dispatch({ type: 'set_company', company })
    },
    setCenter: (center) => {
        dispatch({ type: 'set_center', center })
    },
    setApartment: (apartment) => {
        dispatch({ type: 'set_apartment', apartment })
    },
    setPeriod: (period) => {
        dispatch({ type: 'set_period', period })
    },
    getMotionData: (hubID, ts) => {
        dispatch({ type: 'get_motion_data_request' })
        appService.getMotionData(hubID, ts)
            .then(json => {
                dispatch({ type: 'get_motion_data_success', json })
            }, error => {
                dispatch({ type: 'get_motion_data_failure', error })
            })

    },
    notificationDetails: (hubID) => {
        //dispatch({type: 'CHANGE_PAGE', page: 'Notifications'})
        dispatch({ type: 'get_soft_notification_details_request' })
        appService.getSoftNotificationDetails(hubID)
            .then(json => {
                dispatch({ type: 'get_soft_notification_details_success', json })
            }, error => {
                dispatch({ type: 'get_soft_notification_details_failure', error })
            })

    }

})


const connectedApp = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Apartment))
export { connectedApp as Apartment }