import styled from 'styled-components';

const Span = styled.span`
  align-self: center;
  color: ${({ color }) => color};
`;

const Icon = ({ icon, color }) => {
  return (
    <Span color={color || '#000'} className='material-icons'>
      {icon}
    </Span>
  );
};

export default Icon;
