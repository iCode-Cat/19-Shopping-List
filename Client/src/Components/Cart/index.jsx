import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../../Redux/cartSlice';
import List from './List';
import AddItem from './AddItem';
import ItemDetails from './ItemDetails';

const Wrapper = styled.div`
  opacity: ${(props) => (props.loading === true ? '0.4' : '1')};
  pointer-events: ${(props) => (props.loading === true ? 'none' : 'unset')};
  @media (min-width: 50em) {
    width: 389px;
  }
`;

const Index = ({ State }) => {
  const dispatch = useDispatch();
  const cartState = State.cart;
  const loading = State.cart.loading;
  const itemState = State.items;
  const { flow, list, isActive, activeList } = cartState;
  const { items } = itemState;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  switch (flow) {
    case 'list':
      return (
        <Wrapper loading={loading ? loading : 'none'}>
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
        <Wrapper loading={loading ? loading : 'none'}>
          <AddItem dispatch={dispatch} />
        </Wrapper>
      );
    case 'details':
      return (
        <Wrapper loading={loading ? loading : 'none'}>
          <ItemDetails dispatch={dispatch} State={State} />
        </Wrapper>
      );
    default:
      return <Wrapper>Default</Wrapper>;
  }
};

export default Index;
