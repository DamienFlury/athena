import React, { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import ExamsContext from '../ExamsContext';

const CreateExamDialog = (props) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(1);
  const [date, setDate] = useState(new Date());
  const { subjects } = useContext(ExamsContext);

  return (
    <Dialog {...props}>
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
            {subjects.map(subj => <MenuItem key={subj.id} value={subj.id}>{subj.title}</MenuItem>)}
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
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={() => props.onSubmit({title, date, subjectId: subject})}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}


export default CreateExamDialog;