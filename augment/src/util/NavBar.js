import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';


const drawerWidth = 0;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 88
  },
  selected: {
    backgroundColor: '#54AAB3 !important',
    color: '#ffffff !important'
  },
  toolbarRoot: {
    background: 'url(logo.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center'
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  changePage = (text) => {
    this.props.changePage(text)
    this.setState({
      mobileOpen: false
    })
  }

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} >
        </div>
        <Divider />
        <List>
          {['Dashboard','Apartment'].map((text, index) => (
            <ListItem 
                button 
                key={text}
                onClick={() => this.changePage(text)}
                selected={this.props.currentPage === text}
                classes={{selected: classes.selected}}
            >{/* 
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText disableTypography primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color='secondary' className={classes.appBar}>
          <Toolbar className={classes.toolbarRoot}>
            {/* <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton> 
            <Typography variant="h5" color="inherit" noWrap>
              Oncierre
            </Typography> */}
            <Button color='primary' variant='contained' onClick={this.props.logout} style={{marginLeft: 'auto'}}>logout</Button>
          </Toolbar>
        </AppBar>
        {/* <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav> */}
        <main className={classes.content}>
          {children}
        </main>
      </div>
    );
  }
}

 
function mapStateToProps(state) {
  const {currentPage} = state.app  
  return {
      currentPage
    }
}

const mapDispatchToProps = (dispatch) => ({
    changePage: (page) => {
      dispatch({type: 'CHANGE_PAGE', page})
    },
    logout: () => {
      dispatch({type: 'logout'})
    }
})
  
const connectedNavBar = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
export { connectedNavBar as NavBar }