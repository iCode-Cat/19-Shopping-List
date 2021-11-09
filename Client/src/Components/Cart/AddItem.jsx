import styled from 'styled-components';
import Input from '../Input';
import ListSave from './ListSave';
import { useState } from 'react';

const Wrapper = styled.form`
  position: relative;
  padding: 2.4rem 1.4rem 2.4rem 1.6rem;
  background: #fff;
  height: 100%;
  @media (min-width: 50em) {
    padding: 4.3rem 3.1rem 4.3rem 4.8rem;
  }
`;

const Title = styled.p``;
const InputContainer = styled.div``;

const AddItem = () => {
  const [form, setForm] = useState();
  return (
    <Wrapper>
      <Title>Add a new item</Title>
      <InputContainer>
        <span onChange={(e) => console.log(e.target.value)}>
          <Input title='Name' placeholder='Enter a name' />
        </span>
        <span onChange={(e) => console.log(e.target.value)}>
          <Input
            title='Note (optional)'
            placeholder='Enter a note'
            type='textvalue'
          />
        </span>
        <span onChange={(e) => console.log(e.target.value)}>
          <Input title='Image (optional)' placeholder='Enter a url' />
        </span>
        <span onChange={(e) => console.log(e.target.value)}>
          <Input title='Category' placeholder='Enter a category' />
        </span>
      </InputContainer>
      <ListSave flow='add' />
    </Wrapper>
  );
};

export default AddItem;
