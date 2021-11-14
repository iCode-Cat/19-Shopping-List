import { useParams } from 'react-router';
import { useEffect } from 'react';
import Icon from '../Components/Icon';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div``;
const GoBack = styled.div``;
const ListTitle = styled.p``;
const BoxDate = styled.p`
  font-size: 1.2rem;
  color: #c1c1c4;
`;

const List = () => {
  const params = useParams();
  const { id } = params;

  const getHistoryById = async () => {
    try {
      const get = await axios('/api/shopping/item/find/' + id);
      console.log(get.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistoryById();
  }, []);

  return (
    <div>
      <Icon icon='date_range' color='#C1C1C4' />
    </div>
  );
};

export default List;
