import styled from 'styled-components';

const Wrapper = styled.div``;
const Title = styled.p``;
const InputElement = styled.input``;

const Input = ({ title, placeholder }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <InputElement placeholder={placeholder} type='text' />
    </Wrapper>
  );
};

export default Input;
