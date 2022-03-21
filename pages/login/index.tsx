import styled from '@emotion/styled';
import React, { useState } from 'react';
import MainLayer from '../../layouts/MainLayer';
import * as P from '../../styles/common';

const login = () => {
  const [btnIdx, setBtnIdx] = useState(-1);
  const IconArray = [
    '👨',
    '👩',
    '🧑',
    '👧',
    '👨‍🦲',
    '👶',
    '👵',
    '👴',
    '🧔',
    '👼',
  ];

  return (
    <MainLayer>
      <MainContainer>
        <section>
          <P.PublicTitle>웃참티비 시작하기</P.PublicTitle>
          <P.PublicInput placeholder="닉네임을 입력하세용~!" />
        </section>
        <section>
          <P.PublicTitle>아이콘 선택</P.PublicTitle>
          <IconContainer>
            {IconArray.map((ele, idx) => {
              return (
                <IconSelector
                  key={idx}
                  onClick={() => {
                    setBtnIdx(idx);
                  }}
                  style={
                    btnIdx === idx
                      ? { backgroundColor: '#7bacff' }
                      : { backgroundColor: '#f2f2f2' }
                  }
                >
                  {ele}
                </IconSelector>
              );
            })}
          </IconContainer>
        </section>
        <P.PublicButton>시작하기</P.PublicButton>
      </MainContainer>
    </MainLayer>
  );
};

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

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  justify-items: center;
  row-gap: 10px;
`;

const IconSelector = styled.button`
  width: 50px;
  height: 50px;
  background-color: #f2f2f2;
  border-radius: 50%;
  font-size: 24px;
`;

export default login;
