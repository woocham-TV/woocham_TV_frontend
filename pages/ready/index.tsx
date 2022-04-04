import MainLayer from './../../layouts/MainLayer';
import styled from '@emotion/styled';
import { PublicInput, PublicButton } from './../../styles/common';

export default function ReadyToVideo() {
  return (
    <MainLayer>
      <Title>방송 시작 준비</Title>
      <Input placeholder="방송 제목을 입력하세용~!" />
      <Button>방송 시작</Button>
    </MainLayer>
  );
}

const Title = styled.h1`
  font-size: 16px;
  color: #363636;
  margin-top: 90px;
`;

const Input = styled(PublicInput)`
  margin-top: 20px;
`;

const Button = styled(PublicButton)`
  margin-top: 25px;
`;
