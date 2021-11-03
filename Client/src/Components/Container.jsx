import styled from 'styled-components';

const Wrapper = styled.main`
  flex: 1;
  background: #fafafe;
  height: 100vh;
  overflow: auto;
  padding: 3.8rem 1.2rem;
  @media (min-width: 50em) {
    padding: 3.8rem 8rem;
  }
`;

const Article = styled.article``;

const Container = (props) => {
  return (
    <Wrapper>
      <Article>{props.children}</Article>
    </Wrapper>
  );
};

export default Container;
