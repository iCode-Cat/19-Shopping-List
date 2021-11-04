import styled from 'styled-components';
import Button from '../Button';

const Wrapper = styled.div`
  padding: 2.4rem 1.4rem 2.4rem 1.6rem;
  background: var(--clr-orangeLight);
  height: 100%;
  @media (min-width: 50em) {
    padding: 4.3rem 3.1rem 4.3rem 4.8rem;
  }
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

const List = () => {
  return (
    <Wrapper>
      <Header>
        <HeaderLogo src='/source.svg' height='125px' />
        <HeaderTitle>Didn’t find what you need?</HeaderTitle>
        <Button size='1.1rem 2.9rem'>Add item</Button>
      </Header>
    </Wrapper>
  );
};

export default List;
