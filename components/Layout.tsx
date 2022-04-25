import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import Header from './Common/Header';

interface props {
  children: ReactNode;
}

export default function Layout({ children }: props) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
`;
