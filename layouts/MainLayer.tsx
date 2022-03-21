import styled from '@emotion/styled';
import React from 'react';
import Header from '../components/Header';

interface props {
  children: JSX.Element;
}

const MainLayer = ({ children }: props) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 20px;
`;

export default MainLayer;
