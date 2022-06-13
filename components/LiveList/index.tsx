import MainLayer from '../Layout';
import styled from '@emotion/styled';
import VideoCard from '../Common/VideoCard';
import { PublicTitle } from './../../styles/common';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './../../constants/url';
import { VideoCardType } from './../../interfaces/video';

export default function VideoList() {
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);

  useEffect(() => {
    axios.get(`${BASE_URL}channels`).then(res => {
      setVideoList(res.data);
    });
  }, []);
  return (
    <MainLayer>
      <Title>실시간 웃참방송</Title>
      <ListWrapper>
        {videoList.map((_, idx) => (
          <VideoCard key={idx} videoInfor={_} />
        ))}
      </ListWrapper>
    </MainLayer>
  );
}

const Title = styled(PublicTitle)`
  margin-top: 15px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  gap: 20px;
`;
