import { useSelector } from 'react-redux';
import React from 'react';
import { useFormFields } from '../../Hooks/useFormHandler';

const Login = () => {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });
  console.log(fields);
  return (
    <div>
      <input onChange={(e) => handleFieldChange('email', e)} />
      <input onChange={(e) => handleFieldChange('password', e)} />
    </div>
  );
};

export default Login;
