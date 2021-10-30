import styled from 'styled-components';
import Item from '../Components/Item';

const Wrapper = styled.section``;
const CategoryContainer = styled.div``;
const CategoryTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 23px;
  color: var(--clr-black);
`;
const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, auto));
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 1.8rem;
  gap: 0.85rem;
`;

const Items = () => {
  return (
    <Wrapper>
      <CategoryContainer>
        <CategoryTitle>Fruit and vegetables</CategoryTitle>
        <ItemsContainer>
          <Item text='test' />
          <Item text='teswdwdwdwdwdwdwdwdt' />
          <Item text='test' />
        </ItemsContainer>
      </CategoryContainer>
    </Wrapper>
  );
};

export default Items;
