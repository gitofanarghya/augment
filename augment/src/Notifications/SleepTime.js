import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import ReactApexChart from 'react-apexcharts'
import CompanySelector from '../Dashboard/CompanySelector'
import CenterSelector from '../Dashboard/CenterSelector'
import ApartmentSelector from '../Apartment/ApartmentSelector'
import { appService } from '../App/app.service';
import { Paper, Card, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions } from '@material-ui/core';

const styles = theme => ({
	
    selectors: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
})


class SleepTime extends React.Component {

	setApartment = (apartment) => {
        this.props.setApartment(apartment)
        this.props.notificationDetails(this.props.apartmentObj.hubID)
    }
	
	render() {
		const {classes} = this.props
		return (


			<div id="chart" style={{width: '100%', padding: 10}}>
				<div className={classes.selectors}>
                    <Button color="primary" onClick={() => this.props.changePage('Apartment')}>Back</Button>
                    <CompanySelector company={this.props.company} org={this.props.org} setCompany={this.props.setCompany} />
                    <CenterSelector center={this.props.center} company={this.props.org.filter(c => c.name === this.props.company)[0]} setCenter={this.props.setCenter} />
                    <ApartmentSelector center={this.props.org.filter(c => c.name === this.props.company)[0].centers.filter(c => c.name === this.props.center)[0]} apartment={this.props.apartment} setApartment={this.setApartment} />
                </div>
				<Paper style={{width: '100%'}}>
					<Typography variant='h4' style={{margin:10}}>Sleep Time Trend</Typography>
				{this.props.sleepData.map(s => {
					const series = [
						{
							data: [
								{ 
									x: s.x,
									y: s.y
								}
							]
						}
					]
					const options = {
						chart: {
							type: 'rangeBar',
							toolbar: { tools: { download: false } }
						},
						plotOptions: {
							bar: {
								horizontal: true
							}
						},
						xaxis: {
							type: 'datetime',
							labels: {
								maxHeight: 80,
								style: {
									fontSize: '10px'
								},
								offsetY: -5
							}
						}
                    } 
                    return <ReactApexChart key={`${s.y[0]}${s.y[1]}`} options={options} series={series} type="rangeBar" height={80} style={{marginBottom: -55, width: '95%'}}/>
				})} </Paper>
			</div>
		);
	}
}


function mapStateToProps(state) {
	const { sleepData, org, company, center, apartment, apartmentObj, period, currentPage } = state.app;

	return {
		sleepData: sleepData.sort((a, b) => {
            if (new Date(a['date']).getTime() < new Date(b["date"]).getTime()) { return  1 }
            if (new Date(a["date"]).getTime() > new Date(b["date"]).getTime()) { return -1 }
            return 0
        }).map(s => {
			const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
			return {
				min: new Date(`${s.date} 23:00`).getTime(),
				max: new Date(`${s.date} 21:00`).getTime() + 43200000,
				total: Math.round((s.to - s.from)/3600),
				x: `${week[new Date(s.date).getDay()]} - ${Math.round((s.to - s.from)/3600)}hrs`,
				y: [
					s.from*1000, s.to*1000
				]
			}
		}),
		org, company, center, apartment, apartmentObj, period, currentPage

		
	};
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
    notificationDetails: (hubID) => {
        dispatch({type: 'get_soft_notification_details_request'})
        appService.getSoftNotificationDetails(hubID)
            .then(json => {
                dispatch({type: 'get_soft_notification_details_success', json})
            }, error => {
                dispatch({type: 'get_soft_notification_details_failure', error})
            })
        
	},
	changePage: (page) => {
		dispatch({type: 'CHANGE_PAGE', page})
	}
})

const connectedNotifications = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SleepTime));
export { connectedNotifications as SleepTime }; 