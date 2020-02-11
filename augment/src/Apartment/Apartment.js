import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import CompanySelector from '../Dashboard/CompanySelector'
import CenterSelector from '../Dashboard/CenterSelector'
import ApartmentSelector from './ApartmentSelector'
import PeriodSelector from './PeriodSelector'
import {ActivityGraph} from './MotionGraph'
import { Paper, Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import { appService } from '../App/app.service';

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
        flexWrap: 'wrap',
        padding: '20px',
        flexDirection: 'column',
        height: 250,
        justifyContent: 'space-evenly'
    },
    personal: {
        maxWidth: 300,
    },
    media: {
        height: 70,
        backgroundSize: 'contain'
    },
    notifications: {
        width: 'calc(100% - 200px)',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    notif: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '50%'
    }
})

class Apartment extends React.Component {

    componentDidMount = () => {
    }

    setApartment = (apartment) => {
        this.props.setApartment(apartment)
        this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now()/1000) - 3600)
    }

    setPeriod = (period) => {
        this.props.setPeriod(period)
        if(period === '1hr') {
            this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now()/1000) - 3600)
        } else if(period === '3hrs') {
            this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now()/1000) - 10800)
        } else {
            this.props.getMotionData(this.props.apartmentObj.hubID, Math.round(Date.now()/1000) - 21600)
        }
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
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image="10170-old-man-icon.png"
                                title="Old man"
                            />
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
                        </CardActionArea>
                    </Card>

                    <Card className={classes.notifications}>

                        <div className={classes.notif} style={{borderBottom: '1px solid lightgrey', borderRight: '1px solid lightgrey'}}>
                            <Typography gutterBottom variant="h5" component="h2" >
                                Active Time
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.apartmentObj.softNotifications.filter(s => s.type === 'activeTime')[0].count}
                            </Typography></div>
                        <div className={classes.notif} style={{borderRight: '1px solid lightgrey'}}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Sleep Time
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.apartmentObj.softNotifications.filter(s => s.type === 'sleepTime')[0].count}
                            </Typography></div>
                        <div className={classes.notif} style={{borderBottom: '1px solid lightgrey'}}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Bathroom Visits
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.apartmentObj.softNotifications.filter(s => s.type === 'bathroomVisits')[0].count}
                            </Typography></div>
                        <div className={classes.notif}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Location
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.apartmentObj.softNotifications.filter(s => s.type === 'currentLocation')[0].name}
                            </Typography></div>
                    </Card>


                </div>
                    <PeriodSelector period={this.props.period} setPeriod={this.setPeriod}/>
                <div className={classes.motionGraph}>
                    <ActivityGraph />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { org, company, center, apartment, apartmentObj, period } = state.app

    return {
        org, company, center, apartment, apartmentObj, period
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
        dispatch({type: 'get_motion_data_request'})
        appService.getMotionData(hubID, ts)
            .then(json => {
                dispatch({type: 'get_motion_data_success', json})
            }, error => {
                dispatch({type: 'get_motion_data_failure', error})
            })

    }

})


const connectedApp = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Apartment))
export { connectedApp as Apartment }