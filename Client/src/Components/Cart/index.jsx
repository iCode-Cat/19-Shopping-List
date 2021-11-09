import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../Redux/cartSlice';
import List from './List';
import AddItem from './AddItem';

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
            dispatch={dispatch}
            items={items}
            list={list}
            isActive={isActive}
            activeList={activeList}
          />
        </Wrapper>
      );
    case 'add':
      return (
        <Wrapper>
          <AddItem />
        </Wrapper>
      );
    default:
      return <Wrapper>Default</Wrapper>;
  }
};

export default Index;
