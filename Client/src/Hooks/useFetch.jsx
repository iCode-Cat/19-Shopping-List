import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Redux/userSlice';

// Sample using of the hook
// const [loading, success, error, setFetch] = useFetch();
// setFetch({ url: '/api/auth/login', data: fields, method: 'post' });

export function useFetch() {
  const history = useHistory();
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [fetch, setFetch] = useState({
    url: '',
    data: '',
    method: '',
  });

  const postData = async () => {
    setLoading(true);
    setSuccess(false);
    setError('');
    try {
      const post = await axios({
        method: fetch.method,
        url: fetch.url,
        data: fetch.data,
        withCredentials: true,
      });
      setSuccess(true);
      setLoading(false);
      dispatch(fetchUser());
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      setError(error.response.data);
    }
  };

  // // Everytime authenticaten status changes
  // useEffect(() => {
  //   if (state.isAuthenticated) {
  //     history.push('/');
  //   }
  // }, [state.isAuthenticated]);

  useEffect(() => {
    const returnHook = () => {
      if (fetch.data) {
        postData();
      }
    };
    returnHook();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);
  // custom hook returns value
  return [
    loading,
    success,
    error,
    (data) => {
      setFetch(data);
    },
  ];
}
