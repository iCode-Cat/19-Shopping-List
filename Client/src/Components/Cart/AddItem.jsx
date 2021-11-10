import styled from 'styled-components';
import Input from '../Input';
import ListSave from './ListSave';
import { useFormFields } from '../../Hooks/useFormHandler';
import { useFetch } from '../../Hooks/useFetch';
import { fetchItems } from '../../Redux/ItemsSlice';
import { useEffect, useState } from 'react';
import Categories from './Categories';

const Wrapper = styled.div`
  position: relative;
  padding: 2.4rem 1.4rem 2.4rem 1.6rem;
  background: #fff;
  height: 100%;
  @media (min-width: 50em) {
    padding: 4.3rem 3.1rem 4.3rem 4.8rem;
  }
`;

const Title = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
`;
const InputContainer = styled.div`
  display: grid;
  gap: 1.8rem;
  margin-top: 3.3rem;
  margin-bottom: 1.2rem;
`;

const AddItem = ({ dispatch }) => {
  const [fields, handleFieldChange] = useFormFields(false);
  const [loading, success, error, setFetch] = useFetch();
  const [category, setCategory] = useState('');
  const [toggleOptions, setToggleOptions] = useState(false);

  const addItemHandler = () => {
    setFetch({
      url: '/api/items/add',
      data: { ...fields, category_id: category.id },
      method: 'post',
    });
  };

  useEffect(() => {
    if (success) {
      dispatch(fetchItems());
    }
  }, [loading]);

  useEffect(() => {
    setToggleOptions(false);
  }, [category]);

  return (
    <Wrapper>
      <Title>Add a new item</Title>
      <InputContainer>
        <span onChange={(e) => handleFieldChange('item_name', e)}>
          <Input title='Name' placeholder='Enter a name' />
        </span>
        <span onChange={(e) => handleFieldChange('note', e)}>
          <Input
            title='Note (optional)'
            placeholder='Enter a note'
            type='textarea'
          />
        </span>
        <span onChange={(e) => handleFieldChange('image', e)}>
          <Input title='Image (optional)' placeholder='Enter a url' />
        </span>
        <span onClick={() => setToggleOptions(true)}>
          <Input
            category={category}
            readOnly
            title='Category'
            placeholder='Enter a category'
          />
        </span>
      </InputContainer>
      {toggleOptions && <Categories setCategory={setCategory} />}
      <ListSave addItemHandler={addItemHandler} flow='add' />
    </Wrapper>
  );
};

export default AddItem;
