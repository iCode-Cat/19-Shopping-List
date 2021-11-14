import styled from 'styled-components';
import HistoryCard from '../Components/HistoryCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Components/Loading';

const Wrapper = styled.div``;
const ListWrapper = styled.div`
  display: grid;
  gap: 2.8rem;
`;
const Title = styled.h1`
  font-size: 2.6rem;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 4.1rem;
  color: #34333a;
`;

const History = () => {
  const [historyData, setHistoryData] = useState(false);

  const historyListHandler = async () => {
    try {
      const history = await axios.get('/api/shopping/item/all');
      setHistoryData(history.data);
      console.log(history.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    historyListHandler();
  }, []);

  // LOADING
  if (!historyData) return <Loading />;

  return (
    <Wrapper>
      <Title>Shopping history</Title>
      <ListWrapper>
        {historyData?.map((items, index) => (
          <span key={index}>
            <HistoryCard {...items} />
          </span>
        ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default History;
