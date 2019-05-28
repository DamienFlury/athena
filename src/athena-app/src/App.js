import React, { useState } from 'react';
import { CssBaseline, Toolbar, AppBar, Typography, Button, Box, createMuiTheme, } from '@material-ui/core';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateExam from './components/CreateExamDialog';
import CreateExamDialog from './components/CreateExamDialog';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ExamsContext from './ExamsContext';
import moment from 'moment';
import { blue } from '@material-ui/core/colors';
import { MuiThemeProvider } from '@material-ui/core/styles';

const routes = [
  { path: '/', title: 'Home', component: Home, exact: true },
  { path: '/new-exam', title: 'Create Exam', component: CreateExam },
]

const theme = createMuiTheme({
  palette: {
    "primary": blue,
  }
})

let id = 4;

const App = () => {
  const [open, setOpen] = useState(false);

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
    console.log(exam);
    addExam({ ...exam, id: id++ });
    setOpen(false);
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ExamsContext.Provider value={{ exams, addExam, removeExamById, subjects, addSubject }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <AppBar position="sticky">
              <Toolbar>
                <Typography variant="h6">Athena</Typography>
                <Box flex="1" />
                <Button onClick={() => setOpen(true)} color="inherit">New Exam</Button>
              </Toolbar>
            </AppBar>
            <Box padding="0 20px">
              <Switch>
                {routes.map(route => (
                  <Route key={route.path} {...route} />
                ))}
              </Switch>
            </Box>
          </Router>
          <CreateExamDialog open={open} onClose={() => setOpen(false)} onSubmit={handleSave} onCancel={() => setOpen(false)} />
        </MuiThemeProvider>
      </ExamsContext.Provider>
    </MuiPickersUtilsProvider>
  );
}


export default App;
