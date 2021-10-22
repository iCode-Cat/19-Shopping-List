import React from 'react';
import styled from 'styled-components';

const theme = {
  bgColors: {
    orange: 'var(--clr-orange)',
    none: 'none',
  },
  textColors: {
    white: 'var(--clr-white)',
    grayDark: 'var(--clr-grayDark)',
  },
  size: {
    sm: '1.1rem 2.9rem',
    md: '2rem 2.5rem',
  },
};

const ButtonStyle = styled.button`
  background: ${(props) => theme.bgColors[props.bgColor]};
  color: ${(props) => theme.textColors[props.textColor]};
  padding: ${(props) => theme.size[props.size]};
  border-radius: 12px;
  outline: none;
  border: none;
  cursor: pointer;
`;

const Button = (props) => {
  return (
    <ButtonStyle
      size={props.size}
      textColor={props.textColor}
      bgColor={props.bgColor}
    >
      {props.children}
    </ButtonStyle>
  );
};

export default Button;
