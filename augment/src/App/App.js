import React from 'react';
import { NavBar } from '../util/NavBar'
import Dashboard from '../Dashboard/Dashboard'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { appService } from './app.service';
import { Apartment } from '../Apartment/Apartment';
import { LoginPage } from '../Login/LoginPage';
import { SleepTime } from '../Notifications/SleepTime';

const styles = theme => ({
    
})

class App extends React.Component {
    
    componentDidMount = () => {
        //this.props.getOrg()
    }

    componentWillReceiveProps = nextProps => {
        if(this.props.loggedIn === false && nextProps.loggedIn === true) {
            this.props.getOrg()
        }
    }

    setApartment = (apartment) => {
        this.props.setApartment(apartment)
        this.props.getMotionData(this.props.centerObj.apartments.filter(a => a.name === apartment)[0].hubID, Math.round(Date.now()/1000) - 3600)
        this.props.getLastContact(this.props.centerObj.apartments.filter(a => a.name === apartment)[0].hubID)
    }

    render() {
        const { classes } = this.props
        return (
                <div className={classes.root}>
                    {this.props.loggedIn ? 
                    <NavBar>
                        {
                          this.props.currentPage === 'Dashboard' && <Dashboard companyName={this.props.company} setApartment={this.setApartment} center={this.props.center} org={this.props.org} company={this.props.org.filter(c => c.name === this.props.company)[0]} setCenter={this.props.setCenter} setCompany={this.props.setCompany}/> ||
                          this.props.currentPage === 'Apartment' && <Apartment/> ||
                          this.props.currentPage === 'Notifications' && <SleepTime />
                        }
                    </NavBar> :
                    <LoginPage />}
                </div>
        )
    }
}

function mapStateToProps(state) {
    const {org, currentPage, company, center, centerObj, loggedIn} = state.app

    return {
        org, currentPage, company, center, centerObj, loggedIn
    }
}

const mapDispatchToProps = (dispatch) => ({
    
    getOrg: () => {
        dispatch({type: 'get_org_request'})
        appService.getOrg()
            .then(json => {
                dispatch({type: 'get_org_success', json})
            }, error => {
                dispatch({type: 'get_org_failure', error})
            })
    },
    setCompany: (company) => {
        dispatch({type:'set_company', company})
    },
    setCenter: (center) => {
        dispatch({type:'set_center', center})
    },
    setApartment: (apartment) => {
        dispatch({type: 'set_apartment', apartment})
    },
    getMotionData: (hubID, ts) => {
        dispatch({type: 'get_motion_data_request'})
        appService.getMotionData(hubID, ts)
            .then(json => {
                dispatch({type: 'get_motion_data_success', json})
            }, error => {
                dispatch({type: 'get_motion_data_failure', error})
            })
        dispatch({type: 'get_soft_notification_details_request'})
        appService.getSoftNotificationDetails(hubID)
            .then(json => {
                dispatch({type: 'get_soft_notification_details_success', json})
            }, error => {
                dispatch({type: 'get_soft_notification_details_failure', error})
            })

    },
    getLastContact: (hubID) => {
        dispatch({type: 'get_last_contact_request', hubID})
        appService.getLastContact(hubID)
            .then(json => {
                dispatch({ type: 'get_last_contact_success', json})
            }, error => {
                dispatch({ type: 'get_last_contact_failure'})
            })
    }


})


const connectedApp = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
export { connectedApp as App }