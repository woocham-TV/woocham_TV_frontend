import MainLayer from '../../../layouts/MainLayer';
import styled from '@emotion/styled';
import VideoCard from '../../VideoCard';

export default function Main() {
  return (
    <MainLayer>
      <Title>실시간 웃참방송</Title>
      <ListWrapper>
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </ListWrapper>
    </MainLayer>
  );
}

const Title = styled.h1`
  color: #363636;
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 20px;
`;