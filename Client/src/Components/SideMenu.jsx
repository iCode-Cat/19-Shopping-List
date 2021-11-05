import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import data from '../JSON/content';
import { useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 61px;
  height: 100vh;
  padding: 1.8rem 0rem;
  a {
    display: grid;
    align-items: center;
    position: relative;
    color: unset;
    text-decoration: none;
    width: 100%;
  }
  @media (min-width: 50em) {
    width: 93px;
    padding: 3rem 0rem;
  }
`;
const Logo = styled.img``;
const Title = styled.p`
  opacity: ${(props) => (props.show === 'show' ? 1 : 0)};
  transition: opacity 0.3s;
  position: absolute;
  background: #454545;
  color: #fff;
  border-radius: 4px;
  left: 0px;
  margin-left: 6rem;
  min-width: 64px;
  font-size: 1.2rem;
  padding: 0.5rem 2rem;
  @media (min-width: 50em) {
    margin-left: 7rem;
  }
`;
const RouteContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  gap: 6.7rem;
`;
const Route = styled.span`
  color: var(--clr-gray);
  justify-self: center;
  align-self: center;
`;

const Active = styled.div`
  position: absolute;
  left: 0;
  width: 6px;
  height: 46px;
  border-radius: 0px 4px 4px 0px;
  background: var(--clr-orange);
`;
// Shopping Cart Style
const CartContainer = styled.div`
  position: relative;
`;
const CartIcon = styled.span`
  background: var(--clr-orange);
  padding: 1.1rem;
  border-radius: 50%;
  color: #fff;
`;
const CartAmount = styled.p`
  position: absolute;
  top: -15px;
  right: -5px;
  background: var(--clr-red);
  padding: 0.28rem 0.8rem;
  border-radius: 0.4rem;
  color: #fff;
`;
const SideMenu = ({ Quantity }) => {
  const [order, setOrder] = useState(true);
  const [titleOrder, setTitleOrder] = useState(null);
  const { sideMenu } = data;
  const history = useHistory();
  const pathname = history.location.pathname.replace('/', '');
  return (
    <Wrapper id='sideMenu'>
      <Logo width='38px' src={sideMenu.logo} />

      <RouteContainer>
        {sideMenu.routes.map((ctx, index) => (
          <Link
            onMouseEnter={() => setTitleOrder(index)}
            onMouseLeave={() => setTitleOrder(null)}
            onClick={setOrder}
            to={ctx.title}
            key={index}
          >
            {pathname === ctx.title && <Active />}
            <Title show={index === titleOrder ? 'show' : 'hide'}>
              {ctx.title}
            </Title>
            <Route className='material-icons'>{ctx.icon}</Route>
          </Link>
        ))}
      </RouteContainer>
      <CartContainer>
        <CartAmount>{Quantity}</CartAmount>
        <CartIcon className='material-icons'>shopping_cart</CartIcon>
      </CartContainer>
    </Wrapper>
  );
};

export default SideMenu;
