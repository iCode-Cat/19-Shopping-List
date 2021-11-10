import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.4rem 0.8rem;
`;
const Option = styled.div`
  padding: 1.1rem 2.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
  color: #828282;
  font-size: 1.8rem;
  font-weight: 500;
  &:hover {
    background: #f2f2f2;
    color: #34333a;
  }
`;

const Categories = ({ setCategory }) => {
  const items = useSelector((state) => state.items.items);
  return (
    <Wrapper>
      {items.map((item, index) => (
        <Option
          onClick={() => {
            setCategory({ name: item.category_name, id: item._id });
          }}
          key={index}
        >
          {item.category_name}
        </Option>
      ))}
    </Wrapper>
  );
};

export default Categories;
