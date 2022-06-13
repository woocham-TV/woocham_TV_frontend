import styled from '@emotion/styled';
import React, { ReactNode, useEffect } from 'react';
import Header from './Common/Header';
import { useRecoilState } from 'recoil';
import { userState } from './../modules/recoil/user';
import { useRouter } from 'next/router';
import { USER_NAME_KEY, USER_ICON_KEY } from './../constants/localstorage';
import { UserIcon } from '../typings/user';

interface props {
  children: ReactNode;
}

export default function Layout({ children }: props) {
  const [_user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const { pathname, push } = router;
    const user_name = localStorage.getItem(USER_NAME_KEY);
    const user_icon = localStorage.getItem(USER_ICON_KEY) as UserIcon;

    if (user_name && user_icon) {
      setUser({
        name: user_name,
        icon: user_icon,
      });
    } else if (pathname !== '/') {
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
