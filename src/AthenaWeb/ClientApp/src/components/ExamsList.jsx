import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExamsContext from '../ExamsContext';

const useStyles = makeStyles(theme => ({
  colorIndicator: {
    width: theme.spacing(1),
    background: 'orange',
    marginRight: theme.spacing(1),
    borderRadius: '4px',
  },
  wrapper: {
    padding: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const ExamsList = ({ exams }) => {
  const classes = useStyles();
  const { deleteExamById } = useContext(ExamsContext);
  return (
    exams.length > 0 ? (
      <Paper>
        {exams.slice().sort((a, b) => a.date - b.date).map(exam => (
          <ExpansionPanel key={exam.id} className={classes.listItem}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
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
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Button variant="contained" color="primary" className={classes.button}>
        Done
                  <DoneIcon className={classes.rightIcon} />
                </Button>
                <Button variant="contained" className={classes.button}>
        Edit
                  <EditIcon className={classes.rightIcon} />
                </Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => deleteExamById(exam.id)}>
        Delete
                  <DeleteIcon className={classes.rightIcon} />
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Paper>
    ) : (
      <Paper className={classes.wrapper}>
        <Typography variant="h5">Wow, such empty</Typography>
      </Paper>
    )
  );
};


export default ExamsList;
