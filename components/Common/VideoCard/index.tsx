import styled from '@emotion/styled';
import VideoDetailInfor from '../VideoDetailInfor';
import { VideoCardType } from './../../../interfaces/video';

interface Props {
  videoInfor: VideoCardType;
}

export default function VideoCard({ videoInfor }: Props) {
  return (
    <List url={videoInfor.thumbnail}>
      <ListCover>
        <div className="relative_cover">
          <div className="video_time">3시간 전 시작</div>
          <DetailInforWrapper>
            <VideoDetailInfor videoInfor={videoInfor} />
          </DetailInforWrapper>
        </div>
      </ListCover>
    </List>
  );
}

const List = styled.div<{ url: string }>`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  background-image: ${({ url }) => `url(${url})`};
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const ListCover = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  position: relative;
  background: linear-gradient(
    to bottom,
    rgb(0, 0, 0, 0),
    rgb(0, 0, 0, 0.3),
    rgb(0, 0, 0, 0.8)
  );
  & .relative_cover {
    position: relative;
    width: 100%;
    height: 100%;
  }
  & .video_time {
    border-radius: 3px;
    background: rgb(0, 0, 0, 0.5);
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 500;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const DetailInforWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;
