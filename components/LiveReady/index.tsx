import MainLayer from '../Layout';
import styled from '@emotion/styled';
import { PublicInput, PublicButton, PublicTitle } from '../../styles/common';

export default function ReadyToBroadcast() {
  return (
    <MainLayer>
      <Title>방송 시작 준비</Title>
      <Input placeholder="방송 제목을 입력하세용~!" />
      <ThumbnailSelector>
        <span>여기를 눌러 썸네일을 선택하세요</span>
      </ThumbnailSelector>
      <Button>방송 시작</Button>
    </MainLayer>
  );
}

const Title = styled(PublicTitle)`
  margin-top: 90px;
`;

const Input = styled(PublicInput)`
  margin-top: 20px;
`;

const Button = styled(PublicButton)`
  margin-top: 25px;
`;

const ThumbnailSelector = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 5px;
  border: 1px dashed #8a8a8a;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    color: #848484;
    font-size: 14px;
  }
`;
