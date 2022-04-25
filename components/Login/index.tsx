import styled from '@emotion/styled';
import React, { useState } from 'react';
import Layout from '../Layout';
import * as P from '../../styles/common';
import IconSelect from './IconSelect';

export default function Login() {
  const [iconIdx, setIconIdx] = useState(-1);
  return (
    <Layout>
      <MainContainer>
        <section>
          <P.PublicTitle>웃참티비 시작하기</P.PublicTitle>
          <P.PublicInput placeholder="닉네임을 입력하세용~!" />
        </section>
        <section>
          <P.PublicTitle>아이콘 선택</P.PublicTitle>
          <IconSelect idx={iconIdx} setIdx={setIconIdx} />
        </section>
        <P.PublicButton>시작하기</P.PublicButton>
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
  & > section:first-child {
    margin-bottom: 15px;
  }
  & > section:nth-child(2) {
    margin-bottom: 25px;
  }
`;
