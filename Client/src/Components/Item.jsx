import styled from 'styled-components';
import { addItem } from '../Redux/cartSlice';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 0fr;
  box-shadow: 0px 2px 12px 0px #0000000d;
  background: #ffffff;
  min-height: 50px;
  border-radius: 12px;
  padding: 1.7rem;
  cursor: pointer;
`;

const Text = styled.h1`
  max-width: 190px;
  word-wrap: break-word;
  align-self: flex-start;
  justify-self: flex-start;
  font-size: 1.6rem;
`;

const Icon = styled.span`
  align-self: center;
  color: var(--clr-grayVeryLight);
`;

const Item = (props) => {
  return (
    <Wrapper>
      <Text>{props.text}</Text>
      <Icon
        onClick={() =>
          props.dispatch(
            addItem({
              itemId: props.id,
              categoryId: props.categoryId,
              categoryName: props.categoryName,
              itemName: props.name,
              quantity: 1,
            })
          )
        }
        className='material-icons'
      >
        add
      </Icon>
    </Wrapper>
  );
};

export default Item;
