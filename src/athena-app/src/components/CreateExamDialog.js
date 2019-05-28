import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, Slide } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import ExamsContext from '../ExamsContext';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateExamDialog = (props) => {
  const [title, setTitle] = useState('');
  const { subjects } = useContext(ExamsContext);
  const [subject, setSubject] = useState(subjects[0]);
  const [date, setDate] = useState(new Date());

  return (
    <Dialog {...props} keepMounted TransitionComponent={Transition}>
      <DialogTitle>Create Exam</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Title"
          margin="dense"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
        />
        <FormControl
          margin="dense"
          fullWidth
        >
          <InputLabel htmlFor="subject">Subject</InputLabel>
          <Select
            inputProps={{ id: 'subject' }}
            value={subject}
            onChange={e => setSubject(e.target.value)}
          >
            {subjects.map(subj => <MenuItem key={subj.id} value={subj}>{subj.title}</MenuItem>)}
          </Select>
        </FormControl>
        <DatePicker
          disableToolbar
          label="Date"
          value={date}
          onChange={setDate}
          margin="dense"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          props.onCancel();
          setTitle('');
          setDate(moment());
          setSubject(subjects[0])
        }}>Cancel</Button>
        <Button onClick={() => {
          props.onSubmit({title, date, subject});
          setTitle('');
          setDate(moment());
          setSubject(subjects[0]);
        }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}


export default CreateExamDialog;