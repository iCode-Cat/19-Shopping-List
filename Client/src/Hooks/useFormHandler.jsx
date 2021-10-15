import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFormFields(event) {
  const [fields, setValues] = useState(event);

  return [
    fields,
    (field, event) => {
      setValues({
        ...fields,
        [field]: event.target.value,
      });
    },
  ];
}

export function useSendUser(data) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({
    url: '',
    data: '',
  });

  const postData = async () => {
    try {
      const post = await axios.post(credentials.url, credentials.data, {
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
