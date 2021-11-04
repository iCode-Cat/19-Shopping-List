import styled from 'styled-components';
import List from './List';

const Wrapper = styled.div`
  @media (min-width: 50em) {
    width: 389px;
  }
`;

const Index = ({ State }) => {
  const cartState = State.cart;
  const { flow } = cartState;

  switch (flow) {
    case 'list':
      return (
        <Wrapper>
          <List />
        </Wrapper>
      );
    default:
      return <Wrapper>Default</Wrapper>;
  }
};

export default Index;
