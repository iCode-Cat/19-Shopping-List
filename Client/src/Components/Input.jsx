import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  gap: 0.6rem;
`;
const Title = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  color: #34333a;
`;
const InputElement = styled.input`
  height: 61px;
  width: 100%;
  border-radius: 12px;
  padding: 0 1.7rem;
  border: 2px solid #bdbdbd;
  outline: none;
`;

const TextElement = styled.textarea`
  height: 110px;
  width: 100%;
  border-radius: 12px;
  padding: 2.1rem 1.7rem;
  border: 2px solid #bdbdbd;
  resize: none;
`;

const Input = ({ title, placeholder, type, readOnly, category }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {type === 'textarea' ? (
        <TextElement placeholder={placeholder} />
      ) : (
        <InputElement
          placeholder={placeholder}
          type='text'
          readOnly={readOnly}
          value={category && category?.name}
        />
      )}
    </Wrapper>
  );
};

export default Input;
