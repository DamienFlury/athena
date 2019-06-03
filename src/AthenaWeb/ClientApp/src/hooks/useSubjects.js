import { useEffect, useReducer } from 'react';
import httpClient from '../httpClient';

const useSubjects = () => {
  const [subjects, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.subject];
      case 'REPLACE':
        return action.subjects;
      default:
        return state;
    }
  }, []);
  useEffect(() => {
    httpClient.get('subjects')
      .then(res => dispatch({ type: 'REPLACE', subjects: res.data }));
  }, []);

  return { subjects };
};

export default useSubjects;
