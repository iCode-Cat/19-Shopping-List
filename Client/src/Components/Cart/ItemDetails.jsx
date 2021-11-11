import styled from 'styled-components';
import { useEffect } from 'react';
import { setFlow } from '../../Redux/cartSlice';
import { setId } from '../../Redux/ItemsSlice';
import ListSave from './ListSave';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 3.4rem;
  padding: 2.4rem 1.4rem 2.4rem 1.6rem;
  @media (min-width: 50em) {
    padding: 4.3rem 3.1rem 4.3rem 4.8rem;
  }
`;
const Redirect = styled.p`
  cursor: pointer;
  color: var(--clr-orange);
`;
const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: flex-start;
  justify-items: flex-start;
  gap: 3.6rem;
`;
const Image = styled.img`
  width: 100%;
  max-width: 300px;
  justify-self: center;
  border-radius: 25px;
`;
const LabelContainer = styled.div``;
const Label = styled.p`
  font-size: 1.2rem;
  color: #c1c1c4;
`;
const Text = styled.p`
  font-size: 1.8rem;
  margin-top: 1.1rem;
`;

const ItemDetails = ({ State, dispatch }) => {
  const items = State.items.details;
  const { item_name, image, note } = items;

  // Cache images

  return (
    <Wrapper>
      <Redirect
        onClick={() => {
          dispatch(setFlow('list'));
          dispatch(setId(false));
        }}
      >
        back
      </Redirect>
      <ContentContainer>
        <Image src={image} width={300} alt={item_name} />
        <LabelContainer>
          <Label>name</Label>
          <Text>{item_name}</Text>
        </LabelContainer>
        <LabelContainer>
          <Label>note</Label>
          <Text>{note}</Text>
        </LabelContainer>
      </ContentContainer>
      <ListSave flow='itemAdd' />
    </Wrapper>
  );
};

export default ItemDetails;
