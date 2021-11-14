import styled from 'styled-components';
import { useHistory } from 'react-router';
import Icon from './Icon';

const LabelTheme = {
  color: {
    completed: '#56CCF2',
    cancelled: '#EB5757',
  },
};

const Wrapper = styled.div``;
const Container = styled.div`
  display: grid;
  gap: 2.8rem;
`;
const ContainerTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.7rem;
`;
const BoxContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr repeat(4, auto);

  gap: 2rem;
  box-shadow: 0px 2px 12px 0px #0000000d;
  padding: 2.1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
`;
const BoxTitle = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
`;
const BoxDate = styled.p`
  font-size: 1.2rem;
  color: #c1c1c4;
`;
const BoxLabel = styled.div`
  font-size: 1.2rem;
  color: ${(props) => LabelTheme.color[props.status]};
  border: 1px solid ${(props) => LabelTheme.color[props.status]};
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  line-height: 15px;
`;

const HistoryCard = ({ isCompleted, date, title, _id }) => {
  const history = useHistory();
  return (
    <Wrapper onClick={() => history.push('history/' + _id)}>
      {/* <ContainerTitle>August 2020</ContainerTitle> */}
      <Container>
        <BoxContainer>
          <BoxTitle>{title}</BoxTitle>
          <Icon icon='date_range' color='#C1C1C4' />
          <BoxDate>{date}</BoxDate>
          <BoxLabel status={isCompleted ? 'completed' : 'cancelled'}>
            {isCompleted ? 'completed' : 'cancelled'}
          </BoxLabel>
          <Icon icon='chevron_right' color='#F9A109' />
        </BoxContainer>
      </Container>
    </Wrapper>
  );
};

export default HistoryCard;
