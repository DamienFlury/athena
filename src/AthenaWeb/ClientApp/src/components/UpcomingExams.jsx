import React, { useContext } from 'react';
import {
  Typography, List, Paper, ListItem, Box, makeStyles, Button
} from '@material-ui/core';
import ExamsContext from '../ExamsContext';


const useStyles = makeStyles(() => ({
  colorIndicator: {
    width: '10px',
    background: 'orange',
    margin: '0 10px 0 0',
    borderRadius: '4px',
  },
  wrapper: {
    padding: 20,
  },
}));

const UpcomingExams = () => {
  const { exams } = useContext(ExamsContext);
  const classes = useStyles();
  return (
    <div>
      <Box margin="20px 0">
        <Typography variant="h2">Upcoming Exams</Typography>
      </Box>
      {exams.length > 0 ? (
        <Paper>
          <List>
            {exams.slice().sort((a, b) => a.date - b.date).map(exam => (
              <ListItem key={exam.id} className={classes.listItem}>
                <Box display="flex" width="100%">
                  <div
                    className={classes.colorIndicator}
                    style={{ background: exam.subject.color }}
                  />
                  <span>{exam.title}</span>
                  <Box flex="1" />
                  <span>
                    {exam.date.calendar(null, {
                      sameDay: '[Today]',
                      nextDay: '[Tomorrow]',
                      nextWeek: 'dddd MMM DD',
                      lastDay: '[Yesterday]',
                      lastWeek: '[Last] dddd',
                      sameElse: 'DD/MM/YYYY',
                    })}
                  </span>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Paper className={classes.wrapper}>
          <Typography variant="h5">Wow, such empty</Typography>
        </Paper>
      )}
    </div>
  );
};


export default UpcomingExams;
