import React from 'react';
import styled from 'styled-components';
import { useFormFields, useSendUser } from '../../Hooks/useFormHandler';

const Form = styled.form``;
const Input = styled.input``;
const SubmitButton = styled.button``;

const Login = () => {
  const [fields, handleFieldChange] = useFormFields(false);
  const [loading, success, error, setCredentials] = useSendUser();

  const formHandler = (e) => {
    e.preventDefault();
    setCredentials({ url: '/api/auth/login', data: fields });
  };

  console.log(error);

  return (
    <Form onSubmit={(e) => formHandler(e)}>
      <Input onChange={(e) => handleFieldChange('username', e)} />
      <Input onChange={(e) => handleFieldChange('password', e)} />
      <SubmitButton type='submit'>LOGIN</SubmitButton>
      {loading ? 'LOADING' : 'DONE'}
      {error && <h1>{error}</h1>}
    </Form>
  );
};

export default Login;
