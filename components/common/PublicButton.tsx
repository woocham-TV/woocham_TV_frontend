import styled from '@emotion/styled';
import React from 'react';

interface props {
  text: string;
}

const PublicButton = ({ text }: props) => {
  return <Button>{text}</Button>;
};

const Button = styled.button`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 5px;
  background-color: #0545b1;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`;

export default PublicButton;
