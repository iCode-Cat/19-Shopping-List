import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeItem, quantityHandler } from '../../Redux/cartSlice';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Icon from '../Icon';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0fr;
  align-items: center;
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
  font-weight: 600;
  color: #000;
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

const ListItem = ({ itemName, itemId, quantity }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper>
      <Title>{itemName}</Title>

      {toggle ? (
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
