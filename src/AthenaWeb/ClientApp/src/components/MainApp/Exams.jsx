import React, { useContext } from 'react';
import { Typography, Box, Divider } from '@material-ui/core';
import moment from 'moment';
import ExamsContext from '../../contexts/ExamsContext';
import ExamsList from './ExamsList';

const Exams = () => {
  const { exams } = useContext(ExamsContext);
  return (
    <>
      <Box margin="20px 0 40px 0">
        <Typography variant="h2" gutterBottom>Upcoming</Typography>
        <ExamsList exams={exams.filter(exam => exam.date >= moment(new Date()).startOf('day'))} />
      </Box>
      <Divider />
      <Box margin="20px 0">
        <Typography variant="h2" gutterBottom>Older</Typography>
        <ExamsList exams={exams.filter(exam => exam.date < moment(new Date()).startOf('day'))} />
      </Box>
    </>
  );
};

export default Exams;
