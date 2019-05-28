import React, { useState, useEffect } from 'react';
import { CssBaseline, Toolbar, AppBar, Typography, Button, Box, createMuiTheme, IconButton, Divider, ListItem, ListItemText, ListItemIcon, Drawer, List, } from '@material-ui/core';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateExamDialog from './components/CreateExamDialog';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ExamsContext from './ExamsContext';
import moment from 'moment';
import { blue } from '@material-ui/core/colors';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail'

const routes = [
  { path: '/', title: 'Home', component: Home, exact: true },
]

const theme = createMuiTheme({
  palette: {
    primary: blue,
  }
});

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

let id = 4;


const App = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [exams, setExams] = useState([
    { id: 1, title: "Grammaire", subject: { title: 'french', color: '#88ff22' }, date: moment() },
    { id: 2, title: "Polynomial equations", subject: { title: 'mathematics', color: '#ff3322' }, date: moment() },
    { id: 3, title: "Grammar", subject: { title: 'english', color: '#8833ff' }, date: moment() },
  ]);

  const [subjects, setSubjects] = useState([
    { id: 1, title: 'mathematics', color: '#ff3322' },
    { id: 2, title: 'french', color: '#88ff22' },
    { id: 3, title: 'english', color: '#8833ff' }
  ]);

  const addExam = newExam => setExams(prev => prev.concat(newExam));
  const removeExamById = id => setExams(prev => prev.filter(item => item.id !== id));

  const addSubject = newSubject => setSubjects(prev => prev.concat(newSubject));

  const handleSave = (exam) => {
    addExam({ ...exam, id: id++ });
    setDialogOpen(false);
  }

  useEffect(() => {
    fetch('https://localhost:5001/api/exams').then(res => res.json()).then(data => setExams(data.map(exam => ({...exam, date: moment(exam.date) })))).catch(e => console.log("ERRROORORORO", e));
  }, [])

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ExamsContext.Provider value={{ exams, addExam, removeExamById, subjects, addSubject }}>
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
                  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
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
              <CreateExamDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={handleSave} onCancel={() => setDialogOpen(false)} />
            </div>
          </Router>
        </MuiThemeProvider>
      </ExamsContext.Provider>
    </MuiPickersUtilsProvider>
  )
}


export default App;
