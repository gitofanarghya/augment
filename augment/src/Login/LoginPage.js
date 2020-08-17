import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { appService } from '../App/app.service';

const styles = theme => ({
    AppBar: {
        backgroundColor: "#525963"
    },
    card: {
        maxHeight: 450
    },
    media: {
        paddingTop: '213.64px',//'56.25%', // 16:9
        backgroundSize: 'contain'
    },
    bigLogo: {
        height: '100%',
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }
    }, 
    smallLogo: {
        height: '100%',
        [theme.breakpoints.up(960)]: {
            display: 'none'
        },
        [theme.breakpoints.down(410)]: {
            display: 'none'
        }
    },
    smallerLogo: {
        height: '100%',
        [theme.breakpoints.up(410)]: {
            display: 'none'
        }
    },
    bigHeading: {
        textAlign: 'center',
        [theme.breakpoints.down(960)]: {
            display: 'none'
        }
    }, 
    smallHeading: {
        textAlign: 'center',
        [theme.breakpoints.up(960)]: {
            display: 'none'
        },
        [theme.breakpoints.down(410)]: {
            display: 'none'
        }
    }, 
    smallerHeading: {
        textAlign: 'center',
        [theme.breakpoints.up(410)]: {
            display: 'none'
        }
    },
    mainPic: {
        height: 450,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
})

class LoginPage extends React.Component {

    state = {
        username: '',
        password: ''
    };


    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password)
        }
    }

    render() {
        const { loggingIn, classes } = this.props;
        return ( /* loggingIn ? <Loading /> : */
            <div style={{height: '100%'}}>
            <AppBar className={classes.AppBar} position="static" color="primary">
                <Toolbar disableGutters>
                </Toolbar>            
            </AppBar>
            <Grid container direction="row" justify="center" alignItems='center' style={{height: 'calc(100% - 64px)'}}>
              <Grid md={3} sm={6} xs={10} item style={{marginTop: 100}}>
              <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="/logo.png"
                />
                <CardContent>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="username"
                            label="Email Id"
                            placeholder="Enter your email id"
                            className="email-field"
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            name="password"
                            label="Password"
                            className="password-field"
                            placeholder="Enter your password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <br />
                        <br />
                        <center><Button type="submit" className="submit-button">
                            Login
                        </Button></center>
                    </form>
                </CardContent>
            </Card>
              </Grid>
            </Grid>
            </div>       
        
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.app;
    return {
        loggingIn
    };
}

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        dispatch({type: 'login_request'});
        appService.login(username, password)
            .then(json => { 
                    localStorage.setItem('user', JSON.stringify(json))
                    dispatch({type: 'login_success', json})
                }, error => {
                    dispatch({type: 'login_failure', error})
                })
    }
})

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));
export { connectedLoginPage as LoginPage }; 