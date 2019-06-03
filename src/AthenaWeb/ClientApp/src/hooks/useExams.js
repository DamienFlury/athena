import { useEffect, useReducer } from 'react';
import moment from 'moment';
import Axios from 'axios';

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
  useEffect(() => {
    Axios.get('api/exams')
      .then(res => dispatchExams({ type: 'REPLACE', exams: res.data.map(exam => ({ ...exam, date: moment(exam.date) })) }));
  }, []);

  const addExam = (exam) => {
    Axios.post('api/exams', exam)
      .then((res) => {
        dispatchExams({ type: 'ADD', exam: { ...res.data, date: moment(res.data.date) } });
      });
  };

  const deleteExamById = id => {
    Axios.delete(`api/exams/${id}`)
      .then(res => {
        dispatchExams({ type: 'REMOVE', id });
      });
  };

  return { exams, addExam, deleteExamById };
};

export default useExams;
