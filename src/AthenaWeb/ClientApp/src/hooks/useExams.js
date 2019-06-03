import { useEffect, useReducer } from 'react';
import moment from 'moment';
import httpClient from '../httpClient';

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
    httpClient.get('exams')
      .then(res => dispatchExams({ type: 'REPLACE', exams: res.data.map(exam => ({ ...exam, date: moment(exam.date) })) }));
  }, []);

  const addExam = (exam) => {
    httpClient.post('exams', exam)
      .then((res) => {
        dispatchExams({ type: 'ADD', exam: { ...res.data, date: moment(res.data.date) } });
      });
  };

  return { exams, addExam };
};

export default useExams;
