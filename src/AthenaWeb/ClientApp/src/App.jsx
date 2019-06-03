import React, { useState } from 'react';
import {
  CssBaseline,
  Box,
  createMuiTheme,
} from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { blue } from '@material-ui/core/colors';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';

import ExamsContext from './ExamsContext';
import CreateExamDialog from './components/CreateExamDialog';
import Home from './components/Home';
import useExams from './hooks/useExams';
import useSubjects from './hooks/useSubjects';
import NavBar from './components/NavBar';
import MyDrawer from './components/MyDrawer';

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
              <NavBar
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                setDialogOpen={setDialogOpen}
                classes={classes}
              />
              <MyDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} classes={classes} />
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
