import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { useFetch } from '../../Hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, setFlow } from '../../Redux/cartSlice';
import { addItem, setLoading } from '../../Redux/cartSlice';
import { setId } from '../../Redux/ItemsSlice';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 93px;
  background: #fff;
  align-self: flex-end;
  padding: 1.8rem 1.4rem 1.4rem 2.2rem;
  opacity: ${(props) => (props.loading ? '0.7' : '1')};

  span {
    background: #f9a109;
    border-radius: 12px;
  }
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

const ListSave = ({ flow, addItemHandler }) => {
  const state = useSelector((state) => state.cart);

  const itemDetail = useSelector((state) => state.items.details);
  const itemID = useSelector((state) => state.items.detailID);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(false);
  const currentListID = state.activeList?._id;
  const [loading, success, error, setFetch] = useFetch();

  const createListHandler = () => {
    if (state.list.length < 1 || !title) return alert('Empty');
    dispatch(setLoading(true));
    setFetch({
      url: '/api/shopping/item/add',
      data: {
        title,
        items: state.list,
      },
      method: 'post',
    });
  };

  // Update status of current active list
  const statusHandler = async ({
    isCompleted = false,
    isCanceled = false,
    isActive,
  }) => {
    dispatch(setLoading(true));
    setFetch({
      url: '/api/shopping/status',
      data: {
        id: currentListID,
        isCompleted,
        isCanceled,
        isActive,
      },
      method: 'post',
    });
  };
  useEffect(() => {
    if (success) {
      dispatch(fetchCart());
      dispatch(setLoading(false));
    }
  }, [success]);

  if (flow === 'itemAdd') {
    return (
      <Wrapper>
        <ButtonContainer>
          <span onClick={() => dispatch(setFlow('list'))}>
            <Button bgColor='none' size='2rem 2.3rem'>
              cancel
            </Button>
          </span>
          <span
            onClick={() => {
              dispatch(
                addItem({
                  itemId: itemDetail._id,
                  categoryId: itemDetail.category_id,
                  categoryName: '',
                  itemName: itemDetail.item_name,
                  quantity: 1,
                })
              );
              dispatch(setId(false));
              dispatch(setFlow('list'));
            }}
          >
            <Button bgColor='orange' textColor='white' size='2rem 2.3rem'>
              Add to list
            </Button>
          </span>
        </ButtonContainer>
      </Wrapper>
    );
  }

  if (flow === 'add') {
    return (
      <Wrapper>
        <ButtonContainer>
          <span onClick={() => dispatch(setFlow('list'))}>
            <Button bgColor='none' size='2rem 2.3rem'>
              cancel
            </Button>
          </span>
          <span
            onClick={() => {
              addItemHandler();
            }}
          >
            <Button bgColor='orange' textColor='white' size='2rem 2.3rem'>
              Save
            </Button>
          </span>
        </ButtonContainer>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {state.isActive ? (
        <ButtonContainer>
          <span
            onClick={() =>
              statusHandler({
                isCompleted: false,
                isCanceled: true,
                isActive: false,
              })
            }
          >
            <Button bgColor='none' size='2rem 2.3rem'>
              cancel
            </Button>
          </span>
          <span
            onClick={() =>
              statusHandler({
                isCompleted: true,
                isCanceled: false,
                isActive: false,
              })
            }
          >
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
