import styled from 'styled-components';
import Button from '../Button';
import ListItem from './ListItem';
import Icon from '../Icon';
import ListSave from './ListSave';
import { setFlow } from '../../Redux/cartSlice';

const Wrapper = styled.div`
  position: relative;
  padding: 2.4rem 1.4rem 2.4rem 1.6rem;
  background: var(--clr-orangeLight);
  height: 100%;
  h3 {
    height: 70%;
    display: grid;
    place-items: center;
  }
  @media (min-width: 50em) {
    padding: 4.3rem 3.1rem 4.3rem 4.8rem;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  gap: 2rem;
`;

const Header = styled.header`
  display: grid;
  position: relative;
  justify-items: flex-start;
  gap: 1.2rem;
  padding: 1.6rem 2.7rem 1.6rem 11rem;
  background: #80485b;
  border-radius: 24px;
  @media (min-width: 50em) {
    padding: 1.7rem 2.7rem 1.7rem 12.2rem;
    gap: 1.4rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.2rem;
  margin-bottom: 1rem;
  * {
    color: #34333a;
  }
`;
const Title = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
`;

const HeaderLogo = styled.img`
  position: absolute;
  align-self: center;
  left: 15px;
  bottom: 18px;
  height: 100%;
`;
const HeaderTitle = styled.p`
  font-weight: 700;
  font-size: 1.6rem;
  color: #fff;
`;

const List = ({ items, list, isActive, activeList, dispatch }) => {
  let loopItems = [];
  if (isActive) {
    loopItems = activeList.items;
  } else {
    loopItems = list;
  }

  return (
    <Wrapper>
      <Header>
        <HeaderLogo src='/source.svg' height='125px' />
        <HeaderTitle>Didn’t find what you need?</HeaderTitle>
        <span onClick={() => dispatch(setFlow('add'))}>
          <Button size='1.1rem 2.9rem'>Add item</Button>
        </span>
      </Header>
      {loopItems.length < 1 ? (
        <h3>No Items</h3>
      ) : (
        <ListWrapper>
          <TitleContainer>
            <Title>{activeList.title || 'Shopping List'}</Title>
            <span>
              <Icon icon='edit' />
            </span>
          </TitleContainer>
          {loopItems.map((item) => (
            <ListItem {...item} isActive={isActive} key={item.itemId}>
              {item.itemName}
            </ListItem>
          ))}
        </ListWrapper>
      )}
      <ListSave flow='default' />
    </Wrapper>
  );
};

export default List;
