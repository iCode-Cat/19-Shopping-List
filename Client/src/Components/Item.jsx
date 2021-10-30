import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  grid-auto-flow: column;
  box-shadow: 0px 2px 12px 0px #0000000d;
  background: #ffffff;
  min-height: 50px;
  border-radius: 12px;
  padding: 1.7rem;
  h1 {
    max-width: 70px;
    word-wrap: break-word;
    align-self: flex-start;
  }
`;

const Item = (props) => {
  return (
    <Wrapper>
      <h1>{props.text}</h1>
      <h1>ICON</h1>
    </Wrapper>
  );
};

export default Item;
