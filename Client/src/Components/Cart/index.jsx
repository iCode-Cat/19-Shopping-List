import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../Redux/cartSlice';
import List from './List';

const Wrapper = styled.div`
  @media (min-width: 50em) {
    width: 389px;
  }
`;

const Index = ({ State }) => {
  const dispatch = useDispatch();
  const cartState = State.cart;
  const itemState = State.items;
  const { flow, list, isActive, activeList } = cartState;
  const { items } = itemState;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  switch (flow) {
    case 'list':
      return (
        <Wrapper>
          <List
            items={items}
            list={list}
            isActive={isActive}
            activeList={activeList}
          />
        </Wrapper>
      );
    default:
      return <Wrapper>Default</Wrapper>;
  }
};

export default Index;
