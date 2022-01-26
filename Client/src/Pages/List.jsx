import { useParams, useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import Icon from '../Components/Icon';
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../Components/Loading';

const Wrapper = styled.div``;

const GoBack = styled.div`
  cursor: pointer;
  color: var(--clr-orange);
`;
const ListTitle = styled.p`
  margin-top: 3.5rem;
  font-size: 3.3rem;
  font-weight: 700;
`;

const DateContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1.3rem;
  align-items: center;
`;
const Date = styled.p`
  font-size: 1.2rem;
  color: #c1c1c4;
`;

const ItemBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  margin-top: 4rem;
  justify-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  max-width: 1440px;
`;
const ItemBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 12px 0px #0000000d;
  background: #fff;
  border-radius: 12px;
  min-width: 180px;
  padding: 1.3rem 1.6rem;
  min-height: 50px;
`;
const ItemTitle = styled.p`
  font-size: 1.6rem;
  max-width: 77px;
  word-wrap: break-word;
`;
const ItemQuantity = styled.p`
  color: #f9a10a;
`;

const List = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState(false);
  const history = useHistory();
  const getHistoryById = async () => {
    try {
      const get = await axios(
        'https://shopping-api-test.herokuapp.com/api/shopping/item/find/' + id,
        { withCredentials: true }
      );
      setData(get.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  useEffect(() => {
    getHistoryById();
  }, []);

  // LOADING
  if (!data) return <Loading />;

  return (
    <Wrapper>
      <GoBack onClick={() => history.push('/history')}>Back</GoBack>
      <ListTitle>{data?.title}</ListTitle>
      <DateContainer>
        <Icon icon='date_range' color='#C1C1C4' />
        <Date>{data?.date}</Date>
      </DateContainer>
      <ItemBoxContainer>
        {data?.items.map((item, index) => (
          <ItemBox key={index}>
            <ItemTitle>{item.itemName}</ItemTitle>
            <ItemQuantity>{item.quantity} pcs</ItemQuantity>
          </ItemBox>
        ))}
      </ItemBoxContainer>
    </Wrapper>
  );
};

export default List;
