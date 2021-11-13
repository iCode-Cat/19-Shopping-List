import styled from 'styled-components';
import HistoryCard from '../Components/HistoryCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Wrapper = styled.div``;
const Title = styled.h1`
  font-size: 2.6rem;
  font-style: normal;
  font-weight: 700;
  margin-bottom: 4.1rem;
  color: #34333a;
`;

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  console.log(historyData);

  const historyListHandler = async () => {
    try {
      const history = await axios.get('/api/shopping/item/all');
      setHistoryData(history.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    historyListHandler();
  }, []);

  return (
    <Wrapper>
      <Title>Shopping history</Title>
      {historyData?.map((items, index) => (
        <span key={index}>
          <HistoryCard />
        </span>
      ))}
    </Wrapper>
  );
};

export default History;
