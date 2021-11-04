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

const Title = styled.p`
  justify-self: center;
  color: var(--clr-grayDark);
  font-size: 2rem;
  margin-bottom: 4rem;
`;

const Logo = styled.img`
  justify-self: center;
`;

const Error = styled.p`
  font-size: 1.6rem;
  opacity: 70%;
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

const Login = () => {
  const [fields, handleFieldChange] = useFormFields(false);
  const [loading, success, error, setCredentials] = useSendUser();

  const formHandler = (e) => {
    e.preventDefault();
    setCredentials({ url: '/api/auth/login', data: fields, method: 'post' });
  };

  return (
    <Wrapper load={loading}>
      <Form onSubmit={(e) => formHandler(e)}>
        <Logo height='125px' src={'/source.svg'} />
        <Title>Shopping List Application</Title>
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
        <Button bgColor='orange' textColor='white' size='1.1rem 2.9rem'>
          LOGIN
        </Button>
        {/* <SubmitButton type='submit'>LOGIN</SubmitButton> */}
        <Link to='/register' className='redirect-link'>
          Or click to register.
        </Link>
      </Form>
    </Wrapper>
  );
};

export default Login;
