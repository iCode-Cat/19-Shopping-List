import styled from 'styled-components';
import List from './List';

const Wrapper = styled.div`
  @media (min-width: 50em) {
    width: 389px;
  }
`;

const Index = ({ State }) => {
  const cartState = State.cart;
  const itemState = State.items;
  const { flow, list } = cartState;
  const { items } = itemState;

  switch (flow) {
    case 'list':
      return (
        <Wrapper>
          <List items={items} list={list} />
        </Wrapper>
      );
    default:
      return <Wrapper>Default</Wrapper>;
  }
};

export default Index;
