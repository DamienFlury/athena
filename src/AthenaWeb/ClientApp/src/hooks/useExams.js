import { useEffect, useReducer, useContext } from 'react';
import moment from 'moment';
import Axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const useExams = () => {
  const [exams, dispatchExams] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.exam];
      case 'REMOVE':
        return state.filter(ex => ex.id !== action.id);
      case 'REPLACE':
        return action.exams;
      default:
        return state;
    }
  }, []);
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    Axios.get('api/exams', { headers: { Authorization: `Bearer ${authState.token}` } })
      .then(res => dispatchExams({ type: 'REPLACE', exams: res.data.map(exam => ({ ...exam, date: moment(exam.date) })) }));
  }, []);

  const createExam = (exam) => {
    Axios.post('api/exams', exam, { headers: { Authorization: `Bearer ${authState.token}` } })
      .then((res) => {
        dispatchExams({ type: 'ADD', exam: { ...res.data, date: moment(res.data.date) } });
      });
  };

  const deleteExamById = (id) => {
    Axios.delete(`api/exams/${id}`)
      .then(() => {
        dispatchExams({ type: 'REMOVE', id });
      });
  };

  return { exams, createExam, deleteExamById };
};

export default useExams;
