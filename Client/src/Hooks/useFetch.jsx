import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../Redux/userSlice';

// Sample using of the hook
// const [loading, success, error, setCredentials] = useSendUser();
// setCredentials({ url: '/api/auth/login', data: fields, method: 'post' });

export function useSendUser() {
  const history = useHistory();
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    url: '',
    data: '',
    method: '',
  });

  const postData = async () => {
    setLoading(true);
    setError('');
    try {
      const post = await axios({
        method: credentials.method,
        url: credentials.url,
        data: credentials.data,
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

  // Everytime authenticaten status changes
  useEffect(() => {
    if (state.isAuthenticated) {
      history.push('/');
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    const returnHook = () => {
      if (credentials.data) {
        postData();
      }
      return () => {
        setError(false);
        setSuccess();
      };
    };
    returnHook();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials]);
  // custom hook returns value
  return [
    loading,
    success,
    error,
    (data) => {
      setCredentials(data);
    },
  ];
}
