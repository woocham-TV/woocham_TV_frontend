import styled from '@emotion/styled';
import React, { ReactNode, useEffect } from 'react';
import Header from './Common/Header';
import { useRecoilValue } from 'recoil';
import { userState } from './../modules/recoil/user';
import { useRouter } from 'next/router';

interface props {
  children: ReactNode;
}

export default function Layout({ children }: props) {
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    const { pathname, push } = router;
    if (pathname !== '/' && user.name === null) {
      alert('접근 권한이 없습니다');
      push('/');
    }
  }, []);
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
