import React, { useContext } from 'react';
import moment from 'moment';
import { Typography, Box } from '@material-ui/core';
import ExamsContext from '../ExamsContext';
import ExamsList from './ExamsList';


const UpcomingExams = () => {
  const { exams } = useContext(ExamsContext);
  const upcomingExams = exams.filter(exam => exam.date > moment(new Date()).startOf('day'));
  return (
    <div>
      <Box margin="20px 0">
        <Typography variant="h2">Upcoming Exams</Typography>
      </Box>
      <ExamsList exams={upcomingExams} />
    </div>
  );
};


export default UpcomingExams;
