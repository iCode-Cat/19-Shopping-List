import styled from 'styled-components';
import Item from '../Components/Item';
import { useEffect } from 'react';
import { fetchItems } from '../Redux/ItemsSlice';
import { useDispatch } from 'react-redux';
import SearchBar from '../Components/SearchBar';

const Wrapper = styled.section`
  display: grid;
  gap: 2.4rem;
`;

const Header = styled.header`
  display: none;
  margin-bottom: 1.7rem;
  @media (min-width: 50em) {
    display: flex;
    justify-content: space-between;
    gap: 5rem;
  }
`;
const Title = styled.p`
  font-size: 3.2rem;
  max-width: 500px;
  font-weight: 500;
  span {
    color: var(--clr-orange);
  }
`;

const CategoryContainer = styled.div`
  display: grid;
  gap: 1.8rem;
`;
const CategoryTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 23px;
  color: var(--clr-black);
`;
const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.85rem;
  @media (min-width: 50em) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Items = ({ State }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  const items = State.items.items;
  const searchWord = State.items.search;

  return (
    <Wrapper>
      <Header>
        <Title>
          <span>Shoppingify</span> allows you take your shopping list wherever
          you go
        </Title>
        <SearchBar />
      </Header>
      {items &&
        items.map(
          (item, index) =>
            item.items.length > 0 && (
              <CategoryContainer key={index}>
                {!searchWord && (
                  <CategoryTitle>{item.category_name}</CategoryTitle>
                )}
                <ItemsContainer>
                  {item.items
                    .filter((ctx) =>
                      ctx.item_name
                        .toUpperCase()
                        .includes(searchWord.toUpperCase())
                    )
                    .map((ctx, index) => (
                      <Item key={index} text={ctx.item_name} />
                    ))}
                </ItemsContainer>
              </CategoryContainer>
            )
        )}
    </Wrapper>
  );
};

export default Items;
