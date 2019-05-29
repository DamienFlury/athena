import React, { useState } from 'react';
import {
  CssBaseline,
  Toolbar,
  AppBar,
  Typography,
  Button,
  Box,
  createMuiTheme,
  IconButton,
  Divider, ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  List,
} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { blue } from '@material-ui/core/colors';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ClassIcon from '@material-ui/icons/Class';
import SettingsIcon from '@material-ui/icons/Settings';
import ExamsContext from './ExamsContext';
import CreateExamDialog from './components/CreateExamDialog';
import Home from './components/Home';
import useExams from './hooks/useExams';
import useSubjects from './hooks/useSubjects';

const routes = [
  {
    path: '/', title: 'Home', component: Home, exact: true,
  },
];

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const App = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { exams, addExam } = useExams();
  const { subjects } = useSubjects();


  const handleSave = (exam) => {
    addExam(exam);
    setDialogOpen(false);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ExamsContext.Provider value={{
        exams, subjects,
      }}
      >
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className={classes.root}>
              <CssBaseline />
              <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: drawerOpen,
                })}
              >
                <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={() => setDrawerOpen(true)}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: drawerOpen,
                    })}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6">Athena</Typography>
                  <Box flex="1" />
                  <Button onClick={() => setDialogOpen(true)} color="inherit">New Exam</Button>
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                  [classes.drawerOpen]: drawerOpen,
                  [classes.drawerClose]: !drawerOpen,
                })}
                classes={{
                  paper: clsx({
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                  }),
                }}
                open={drawerOpen}
              >
                <div className={classes.toolbar}>
                  <IconButton onClick={() => setDrawerOpen(false)}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <Divider />
                <List>
                  {[{ title: 'Account', icon: AccountBoxIcon }, { title: 'Subjects', icon: ClassIcon }].map(item => (
                    <ListItem button key={item.title}>
                      <ListItemIcon><item.icon /></ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  <ListItem button>
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </List>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Box padding="0 20px">
                  <Switch>
                    {routes.map(route => (
                      <Route key={route.path} {...route} />
                    ))}
                  </Switch>
                </Box>
              </main>
              <CreateExamDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSave}
                onCancel={() => setDialogOpen(false)}
              />
            </div>
          </Router>
        </MuiThemeProvider>
      </ExamsContext.Provider>
    </MuiPickersUtilsProvider>
  );
};


export default App;
