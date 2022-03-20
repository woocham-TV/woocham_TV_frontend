import styled from '@emotion/styled';
import React from 'react';

interface props {
  text: string;
}

const PublicTitle = ({ text }: props) => {
  return <TitleText>{text}</TitleText>;
};

const TitleText = styled.p`
  color: #363636;
  font-size: 16px;
  font-weight: bold;
`;

export default PublicTitle;
