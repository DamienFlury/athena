import React, { useState } from 'react';
import { makeStyles, Box } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Home from './MainApp/Home';
import Exams from './MainApp/Exams';
import ExamsContext from '../contexts/ExamsContext';
import useSubjects from '../hooks/useSubjects';
import useExams from '../hooks/useExams';
import NavBar from './MainApp/NavBar';
import MyDrawer from './MainApp/MyDrawer';
import CreateExamDialog from './MainApp/CreateExamDialog';

const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
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

const routes = [
  {
    path: '/', title: 'Home', component: Home, exact: true,
  },
  {
    path: '/exams', title: 'Exams', component: Exams,
  },
];

const MainApp = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { exams, createExam, deleteExamById } = useExams();
  const { subjects } = useSubjects();

  const handleSave = (exam) => {
    createExam(exam);
    setDialogOpen(false);
  };

  const props = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
  });

  return (
    <ExamsContext.Provider value={{
      exams, subjects, deleteExamById,
    }}
    >
      <Router>
        <animated.div className={classes.root} style={props}>
          <NavBar
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            setDialogOpen={setDialogOpen}
            classes={classes}
          />
          <MyDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            classes={classes}
          />
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
        </animated.div>
      </Router>
    </ExamsContext.Provider>
  );
};

export default MainApp;
