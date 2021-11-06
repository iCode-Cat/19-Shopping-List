import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeItem, quantityHandler } from '../../Redux/cartSlice';
import { useState } from 'react';
import Icon from '../Icon';
import { useEffect } from 'react';
import { useFetch } from '../../Hooks/useFetch';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.8rem;
  .item-icon {
    margin-top: 0.7rem;
    cursor: pointer;
  }
`;

const QuantityWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;

  background: #fff;
  border-radius: 12px;
  place-items: center;
  padding-right: 0.9rem;
  gap: 0.9rem;
  p {
    font-size: 2.5rem;
    cursor: pointer;
    color: #f9a109;
  }
`;

const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: #000;
  flex: 1 0;
  text-decoration: ${({ marked }) =>
    marked === 'done' ? 'line-through' : 'unset'};
`;

const Quantity = styled.div`
  display: grid;

  place-items: center;
  color: #f9a109;
  width: 68px;
  height: 32px;
  border: 2px solid #f9a109;
  border-radius: 24px;
  font-size: 1.2rem;
  margin: 0.6rem 0;
`;
const IconWrapper = styled.span`
  border-radius: 12px;
  width: 37px;
  display: grid;
  place-items: center;
  background: #f9a109;
  height: 100%;
  cursor: pointer;
  span {
    font-size: 2rem;
  }
`;

const ListItem = ({
  itemName,
  itemId,
  _id,
  quantity,
  isActive,
  isCompleted,
}) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [check, setCheck] = useState(isCompleted);
  const [isloaded, setLoaded] = useState(false);
  const [marked, setMarked] = useState(false);
  const [loading, success, error, setCredentials] = useFetch();

  // @TODO Create update item status API

  const updateItemStatus = () => {
    setCredentials({
      url: '/api/shopping/item/update',
      data: {
        id: _id,
        status: !check,
      },
      method: 'post',
    });
  };

  const updateItemHandler = async () => {
    updateItemStatus();
    setCheck(!check);
  };

  return (
    <Wrapper>
      {isActive && (
        <span
          onClick={() => {
            if (loading) return;
            updateItemHandler();
          }}
          className='item-icon'
        >
          <Icon
            color='#F9A109'
            icon={check ? 'check_box' : 'check_box_outline_blank'}
          />
        </span>
      )}
      <Title marked={check ? 'done' : 'active'}>{itemName}</Title>

      {toggle && !isActive ? (
        <QuantityWrapper key={1} onMouseLeave={() => setToggle(false)}>
          <IconWrapper onClick={() => dispatch(removeItem(itemId))}>
            <Icon color='#fff' icon='delete' />
          </IconWrapper>
          <p
            onClick={() =>
              dispatch(quantityHandler({ type: 'decrement', itemId }))
            }
          >
            -
          </p>
          <Quantity>{quantity} pcs</Quantity>
          <p
            onClick={() =>
              dispatch(quantityHandler({ type: 'increment', itemId }))
            }
          >
            +
          </p>
        </QuantityWrapper>
      ) : (
        <Quantity key={2} onMouseEnter={() => setToggle(true)}>
          {quantity} pcs
        </Quantity>
      )}
    </Wrapper>
  );
};

export default ListItem;
