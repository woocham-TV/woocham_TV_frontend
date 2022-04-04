import styled from '@emotion/styled';
import PeopleCnt from '../../assets/peopleCnt';

export default function VideoCard() {
  return (
    <List>
      <ListCover>
        <div className="relative_cover">
          <div className="video_time">3시간 전 시작</div>
          <DetailInfor>
            <h1>😁</h1>
            <div className="container">
              <h3>실시간 웃참방송</h3>
              <div className="flex_wrap">
                <span>김팔복 님</span>
                <div className="circle" />
                <div>
                  <PeopleCnt />
                  <span>6</span>
                </div>
              </div>
            </div>
          </DetailInfor>
        </div>
      </ListCover>
    </List>
  );
}

const List = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  background-image: url('https://d2v80xjmx68n4w.cloudfront.net/gigs/JU2Lp1593392669.jpg');
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

const DetailInfor = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
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
