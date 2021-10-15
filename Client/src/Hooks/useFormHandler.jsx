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
  const [credentials, setCredentials] = useState({
    url: '',
    data: '',
  });

  const postData = async () => {
    setLoading(true);
    try {
      const post = await axios.post(credentials.url, credentials.data);
      console.log(post.data);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (credentials.data) {
      postData();
    }
  }, [credentials]);
  // custom hook returns value
  return [
    loading,
    success,
    (data) => {
      setCredentials(data);
    },
  ];
}
