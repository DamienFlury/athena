import React, { useContext } from 'react';
import { Typography, List, Paper, ListItem, withStyles, Box } from '@material-ui/core';
import ExamsContext from '../ExamsContext';



const UpcomingExams = ({ classes }) => {
  const {exams} = useContext(ExamsContext);
  return (
    <div>
      <Box margin="20px 0">
        <Typography variant="h2" className={classes.title}>Upcoming Exams</Typography>
      </Box>
      <Paper>
        <List>
          {exams.map(exam => (
            <ListItem key={exam.id} className={classes.listItem}>
              <Box display="flex">
                <div className={classes.child} style={{ background: exam.subject.color }} />
                <span>{exam.title}</span>
              </Box>
            </ListItem>))}
        </List>
      </Paper>
    </div>
  );
}

const styles = {
  child: {
    width: '10px',
    background: 'orange',
    margin: '0 10px 0 0',
    borderRadius: '4px'
  }
}

export default withStyles(styles)(UpcomingExams);