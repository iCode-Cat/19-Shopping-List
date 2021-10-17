import { useState, useEffect } from 'react';
import axios from 'axios';

// Sample using of the hook
// const [loading, success, error, setCredentials] = useSendUser();
// setCredentials({ url: '/api/auth/login', data: fields, method: 'post' });

export function useSendUser() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({
    url: '',
    data: '',
    method: '',
  });

  const postData = async () => {
    try {
      const post = await axios({
        method: credentials.method,
        url: credentials.url,
        data: credentials.data,
        withCredentials: true,
      });
      console.log(post.data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    if (credentials.data) {
      postData();
    }
    return () => {
      setLoading(true);
      setError(false);
      setSuccess();
    };
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
