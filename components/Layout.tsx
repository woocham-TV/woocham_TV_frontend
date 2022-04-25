import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import Header from './Common/Header';

interface props {
  children: ReactNode;
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
