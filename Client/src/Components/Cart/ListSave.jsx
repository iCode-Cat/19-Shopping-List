import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { useFetch } from '../../Hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../Redux/cartSlice';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 93px;
  background: #fff;
  align-self: flex-end;
  padding: 1.8rem 1.4rem 1.4rem 2.2rem;
`;

const InputContainer = styled.div`
  display: flex;
  border: 2px solid #f9a109;
  border-radius: 12px;
  overflow: hidden;
  height: 61px;
`;

const Input = styled.input`
  border: 0;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 2rem;
`;

const ListSave = () => {
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(false);
  const [loading, success, error, setCredentials] = useFetch();

  const createListHandler = () => {
    if (state.list.length < 1 || !title) return alert('Empty');
    setCredentials({
      url: '/api/shopping/item/add',
      data: {
        title,
        items: state.list,
      },
      method: 'post',
    });
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [success]);

  return (
    <Wrapper>
      {state.isActive ? (
        <ButtonContainer>
          <span>
            <Button bgColor='none' size='2rem 2.3rem'>
              cancel
            </Button>
          </span>
          <span>
            <Button bgColor='blue' textColor='white' size='2rem 2.3rem'>
              Complete
            </Button>
          </span>
        </ButtonContainer>
      ) : (
        <InputContainer>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter a name'
          />
          <span onClick={createListHandler}>
            <Button
              radius='none'
              size='2rem 2.4rem'
              textColor='white'
              bgColor='orange'
            >
              Save
            </Button>
          </span>
        </InputContainer>
      )}
    </Wrapper>
  );
};

export default ListSave;
