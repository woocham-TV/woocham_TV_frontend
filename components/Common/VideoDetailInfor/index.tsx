import styled from '@emotion/styled';
import PeopleCnt from '../../../assets/peopleCnt';
import { VideoCardType } from './../../../interfaces/video';

interface Props {
  videoInfor: VideoCardType;
}

export default function VideoDetailInfor({ videoInfor }: Props) {
  return (
    <DetailInfor>
      <h1>{videoInfor.profile_emoji}</h1>
      <div className="container">
        <h3>{videoInfor.title}</h3>
        <div className="flex_wrap">
          <span>{videoInfor.profile_name} 님</span>
          {/*     <div className="circle" /> */}
          {/*           <div>
            <PeopleCnt />
            <span>6</span>
          </div> */}
        </div>
      </div>
    </DetailInfor>
  );
}

const DetailInfor = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  & h1 {
    font-size: 23px;
  }
  & .container {
    display: flex;
    flex-direction: column;
    & h3 {
      color: white;
      font-size: 13px;
    }
    & .flex_wrap {
      display: flex;
      gap: 5px;
      align-items: center;
      & span {
        color: white;
        font-size: 11px;
      }
      & .circle {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: white;
      }
      & div {
        display: flex;
        gap: 3px;
        align-items: center;
        margin-top: 2px;
      }
    }
  }
`;
