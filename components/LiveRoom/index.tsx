import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styled from '@emotion/styled';
import VideoDetailInfor from '../Common/VideoDetailInfor';
import Send from '../../assets/send';
import Comment from '../Common/Comment';
import { SOCKET_SERVER_URL } from '../../constants/env';

const pc_config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};
const SERVER_URL = SOCKET_SERVER_URL as string;

export default function LiveBroadcastRoom() {
  const socketRef = useRef<SocketIOClient.Socket>();
  const pcRef = useRef<RTCPeerConnection>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const setVideoTracks = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (!(pcRef.current && socketRef.current)) return;
      stream.getTracks().forEach(track => {
        if (!pcRef.current) return;
        pcRef.current.addTrack(track, stream);
      });
      pcRef.current.onicecandidate = e => {
        if (e.candidate) {
          if (!socketRef.current) return;
          console.log('onicecandidate');
          socketRef.current.emit('candidate', e.candidate);
        }
      };
      pcRef.current.oniceconnectionstatechange = e => {
        console.log(e);
      };
      pcRef.current.ontrack = ev => {
        console.log('add remotetrack success');
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = ev.streams[0];
        }
      };
      socketRef.current.emit('join_room', {
        room: '1234',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log('create offer');
    if (!(pcRef.current && socketRef.current)) return;
    try {
      const sdp = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
      socketRef.current.emit('offer', sdp);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    if (!(pcRef.current && socketRef.current)) return;
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      console.log('answer set remote description success');
      const mySdp = await pcRef.current.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
      });
      console.log('create answer');
      await pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));
      socketRef.current.emit('answer', mySdp);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io.connect(SERVER_URL);
    pcRef.current = new RTCPeerConnection(pc_config);

    socketRef.current.on('all_users', (allUsers: Array<{ id: string }>) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current.on('getOffer', (sdp: RTCSessionDescription) => {
      //console.log(sdp);
      console.log('get offer');
      createAnswer(sdp);
    });

    socketRef.current.on('getAnswer', (sdp: RTCSessionDescription) => {
      console.log('get answer');
      if (!pcRef.current) return;
      pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      //console.log(sdp);
    });

    socketRef.current.on(
      'getCandidate',
      async (candidate: RTCIceCandidateInit) => {
        if (!pcRef.current) return;
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('candidate add success');
      },
    );

    setVideoTracks();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <Wrapper>
      <Screen muted ref={localVideoRef} autoPlay />
      <Screen id="remotevideo" ref={remoteVideoRef} autoPlay />
      <Container>
        <TopBar>
          <VideoDetailInfor />
          <div className="live">LIVE</div>
        </TopBar>
        <BottomBar>
          <Comment />
          <div className="input-wrapper">
            <input type="text" placeholder="댓글을 입력해 주세요." />
            <button>
              <Send />
            </button>
          </div>
        </BottomBar>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Screen = styled.video`
  width: 100%;
  height: 50%;
  background-color: #d1d1d1;
  &:nth-of-type(2) {
    background-color: #999999;
  }
  object-fit: cover;
  transform: scaleX(-1);
`;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    to bottom,
    rgb(0, 0, 0, 0.3),
    rgb(0, 0, 0, 0),
    rgb(0, 0, 0, 0),
    rgb(0, 0, 0, 0.5)
  );
  z-index: 2;
  padding: 30px 20px;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & .live {
    border-radius: 5px;
    background: linear-gradient(#ff4141, #ff7e6a);
    padding: 0px 13px;
    text-align: center;
    display: flex;
    align-items: center;
    height: 23px;
    color: white;
    font-size: 13px;
    font-weight: bold;
  }
`;

const BottomBar = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  & .input-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & input {
      border: 1px solid white;
      border-radius: 10px;
      width: 80%;
      height: 45px;
      padding: 0 15px;
      background: none;
      color: white;
      font-size: 13px;
      font-weight: 500;
      &::placeholder {
        color: white;
      }
    }
  }
`;
