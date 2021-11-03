import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { searchItem } from '../Redux/ItemsSlice';
import Icon from './Icon';
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;

  .search__icon {
    position: absolute;
    left: 20px;
    margin-top: 1rem;
  }
`;
const Input = styled.input`
  border: none;
  border-radius: 12px;
  box-shadow: 0px 2px 12px 0px #0000000a;
  padding: 1.3rem 1.6rem 1.3rem 6rem;
  max-width: 275px;
  width: 100vw;
  height: 100%;
  &::placeholder {
    opacity: 1;
    color: #bdbdbd;
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

const SearchBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.items.search);

  const searchHandler = (e) => {
    dispatch(searchItem(e.target.value));
  };

  return (
    <Wrapper>
      <span className='search__icon'>
        <Icon icon='search' />
      </span>
      <Input
        onChange={(e) => searchHandler(e)}
        value={state}
        type='text'
        placeholder='search item'
      />
    </Wrapper>
  );
};

export default SearchBar;
