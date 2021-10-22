import React from 'react';
import styled from 'styled-components';
import { useFormFields } from '../Hooks/useFormHandler';
import { useSendUser } from '../Hooks/useFetch';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';

const Wrapper = styled.section`
  display: grid;
  min-height: 100vh;
  width: 100%;
  place-items: center;
  grid-template-columns: 1fr;
  padding: 2rem;
  pointer-events: ${(props) => (props.loading ? 'none' : 'unset')};
  opacity: ${(props) => (props.load ? '0.5' : '1')};
  .redirect-link {
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--clr-blue);
    text-decoration: none;
  }
`;

const Error = styled.p`
  font-size: 1.6rem;
  height: 20px;
  color: var(--clr-red);
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;
const Input = styled.input`
  height: 40px;
  padding: 2rem;
  border-radius: 12px;
  border: 1px var(--clr-orange) solid;
  outline: none;
`;

const Register = () => {
  const [fields, handleFieldChange] = useFormFields(false);
  const [loading, success, error, setCredentials] = useSendUser();

  const formHandler = (e) => {
    e.preventDefault();
    setCredentials({ url: '/api/auth/register', data: fields, method: 'post' });
  };

  return (
    <Wrapper load={loading}>
      <Form onSubmit={(e) => formHandler(e)}>
        <Error>{error}</Error>
        <Input
          placeholder='Username'
          autoComplete='username'
          type='text'
          onChange={(e) => handleFieldChange('username', e)}
        />
        <Input
          type='password'
          autoComplete='current-password'
          placeholder='Password'
          onChange={(e) => handleFieldChange('password', e)}
        />
        <Button bgColor='orange' textColor='white' size='sm'>
          REGISTER
        </Button>
        {/* <SubmitButton type='submit'>LOGIN</SubmitButton> */}
        <Link to='/login' className='redirect-link'>
          Or click to login.
        </Link>
      </Form>
    </Wrapper>
  );
};

export default Register;
