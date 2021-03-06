import styled from 'styled-components';
import Item from '../Components/Item';
import { useDispatch } from 'react-redux';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';
import { setItem, setLoading } from '../Redux/ItemsSlice';
import { setFlow } from '../Redux/cartSlice';
import { useEffect, useMemo } from 'react';

import Loading from '../Components/Loading';

const Wrapper = styled.section`
  display: grid;
  gap: 2.4rem;
  opacity: ${(props) => (props.loading === true ? '0.4' : '1')};
  pointer-events: ${(props) => (props.loading === true ? 'none' : 'unset')};
`;

const Header = styled.header`
  display: none;
  margin-bottom: 1.7rem;

  @media (min-width: 70em) {
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
  gap: 1rem 0.85rem;
  @media (min-width: 70em) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
    gap: 2.4rem 2rem;
  }
`;

const Items = ({ State }) => {
  const items = State.items.items;
  const searchWord = State.items.search;
  const ItemId = State.items.detailID;
  const loading = State.items.loading;
  const dispatch = useDispatch();

  const getOneItem = async () => {
    try {
      dispatch(setLoading(true));
      const get = await axios.get(
        'https://shopping-api-test.herokuapp.com/api/items/find/' + ItemId,
        { withCredentials: true }
      );
      dispatch(setItem(get.data));
      // Change right component to item details
      dispatch(setFlow('details'));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
  useMemo(() => {
    if (!ItemId) return;
    getOneItem();
  }, [ItemId]);

  // useEffect(() => {}, [ItemId]);

  if (!items) return <Loading />;

  return (
    <Wrapper loading={loading ? loading : 'none'}>
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
            item?.items?.length > 0 && (
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
                      <Item
                        id={ctx._id}
                        name={ctx.item_name}
                        categoryId={item._id}
                        categoryName={item.category_name}
                        dispatch={dispatch}
                        key={index}
                        text={ctx.item_name}
                      />
                    ))}
                </ItemsContainer>
              </CategoryContainer>
            )
        )}
    </Wrapper>
  );
};

export default Items;
