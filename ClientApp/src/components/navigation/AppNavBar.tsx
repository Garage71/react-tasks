import { Theme } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AddComment, TableChart } from '@material-ui/icons';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IApiState } from 'src/redux-infrastucture/store/apiState';
import { IState } from 'src/redux-infrastucture/store/state';
import AddNewTask from '../form/AddNewTask';
import SmartTable from '../table/TasksTable';

interface IAppDrawerProps {
    api: IApiState;
    classes?: any;
}

class DrawerWithNavigation extends React.Component<IAppDrawerProps> {


    private routes = [
        { path: '/tasks', title: 'Task list', icon: () => <TableChart/> },
        { path: '/addtask', title: 'Add new task', icon: () => <AddComment/> },        
    ];

    private highlightItem  = (route: string, pathname: string) : boolean => {
        if(pathname === '/') {            
            return route === '/tasks';
        }

        if(pathname === route) {
            return true;
        }

        if(pathname.indexOf(route) === 0) {
            return true;
        }

        return false;
    }

    public render () {
        const { classes } = this.props;
        const { pathname } = window.location;
        return (<div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap={true}>
                    React tasks app
                </Typography>
            </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {this.routes.map((route, index) => (
                        <NavLink key={index} exact={true} activeClassName={classes.current} className={classes.link} to={route.path} >
                            <ListItem button={true} key={route.title} selected={this.highlightItem(route.path, pathname)}>
                                <ListItemIcon>{route.icon()}</ListItemIcon>
                                <ListItemText primary={route.title} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Route path='/' exact={true} component={SmartTable} />
                <Route path='/tasks' exact={true} component={SmartTable} />
                <Route path='/tasks/:id' exact={true} render={(props) => <SmartTable {...props} isAuthed={true} />} />
                <Route path='/addtask' exact={true} component={AddNewTask} />
            </main>
        </div>);
    };    
}


const mapStateToProps = (state: IState): IAppDrawerProps => ({
    api: state.api
});
  

const drawerWidth = 240;

const styles = (theme: Theme) => ({  
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
  },
});


export default withRouter(connect(mapStateToProps)(withStyles(styles as any, { withTheme: true })(DrawerWithNavigation as any)) as any);