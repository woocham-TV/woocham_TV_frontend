import styled from '@emotion/styled';
import React, { ChangeEvent, useCallback, useState } from 'react';
import Layout from '../Layout';
import * as P from '../../styles/common';
import IconSelect from './IconSelect';
import { UserIcons } from './../../constants/userIcon';
import { useRecoilState } from 'recoil';
import { userState } from './../../modules/recoil/user';
import { useRouter } from 'next/router';
import { USER_NAME_KEY, USER_ICON_KEY } from './../../constants/localstorage';

export default function Login() {
  const [icon, setIcon] = useState(UserIcons[0]);
  const [name, setName] = useState('');
  const [_user, setuser] = useRecoilState(userState);
  const router = useRouter();

  const handleNameInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [],
  );

  const registUser = () => {
    setuser({ name, icon });
    localStorage.setItem(USER_NAME_KEY, name);
    localStorage.setItem(USER_ICON_KEY, icon);
    router.push('/live/list');
  };

  return (
    <Layout>
      <MainContainer>
        <section>
          <P.PublicTitle>웃참티비 시작하기</P.PublicTitle>
          <P.PublicInput
            placeholder="닉네임을 입력하세용~!"
            onChange={handleNameInput}
          />
        </section>
        <section>
          <P.PublicTitle>아이콘 선택</P.PublicTitle>
          <IconSelect icon={icon} setIcon={setIcon} />
        </section>
        <P.PublicButton onClick={registUser}>시작하기</P.PublicButton>
      </MainContainer>
    </Layout>
  );
}

const MainContainer = styled(P.PublicContainer)`
  padding-top: 90px;
  & > section {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  & > section:first-of-type {
    margin-bottom: 15px;
  }
  & > section:nth-of-type(2) {
    margin-bottom: 25px;
  }
`;
