import React from 'react';
import styled from 'styled-components';

const theme = {
  bgColors: {
    orange: 'var(--clr-orange)',
    white: 'var(--clr-white)',
    blue: 'var(--clr-blue)',
    none: 'var(--clr-white)',
  },
  textColors: {
    white: 'var(--clr-white)',
    black: 'var(--clr-white)',
    grayDark: 'var(--clr-grayDark)',
  },
};

const ButtonStyle = styled.button`
  background: ${(props) => theme.bgColors[props.bgColor]};
  color: ${(props) => theme.textColors[props.textColor]};
  padding: ${(props) => props.size};
  font-weight: 700;
  border-radius: ${(props) => (props.radius === 'none' ? '0' : '12px')};
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
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
      radius={props.radius}
    >
      {props.children}
    </ButtonStyle>
  );
};

export default Button;
