import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import io from 'socket.io-client';
import { SOCKET_SERVER_URL } from '../../constants/env';
import styled from '@emotion/styled';
import VideoDetailInfor from '../Common/VideoDetailInfor';
import Comment from '../Common/Comment';
import Send from '../../assets/send';
import Video from './Video';
import { useRouter } from 'next/router';
import { USER_ICON_KEY, USER_NAME_KEY } from '../../constants/localstorage';
import axios from 'axios';
import { BASE_URL } from './../../constants/url';

const pc_config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};
const SERVER_URL = SOCKET_SERVER_URL as string;

export default function LiveRoom() {
  const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const room_id = router.query.id;
  const [msg, setMsg] = useState('');
  const [commentData, setCommentData] = useState<any>([]);
  const [videoInfor, setVideoInfor] = useState<any>();

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 240,
        },
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socketRef.current) return;
      socketRef.current.emit('join_room', {
        room: room_id,
        email: 'sample@naver.com',
      });
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, []);

  const createPeerConnection = useCallback(
    (socketID: string, email: string) => {
      try {
        const pc = new RTCPeerConnection(pc_config);

        pc.onicecandidate = e => {
          if (!(socketRef.current && e.candidate)) return;
          console.log('onicecandidate');
          socketRef.current.emit('candidate', {
            candidate: e.candidate,
            candidateSendID: socketRef.current.id,
            candidateReceiveID: socketID,
          });
        };

        pc.oniceconnectionstatechange = e => {
          console.log(e);
        };

        pc.ontrack = e => {
          console.log('ontrack success');
          setUsers(oldUsers =>
            oldUsers
              .filter(user => user.id !== socketID)
              .concat({
                id: socketID,
                email,
                stream: e.streams[0],
              }),
          );
        };

        if (localStreamRef.current) {
          console.log('localstream add');
          localStreamRef.current.getTracks().forEach(track => {
            if (!localStreamRef.current) return;
            pc.addTrack(track, localStreamRef.current);
          });
        } else {
          console.log('no local stream');
        }

        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    [],
  );

  useEffect(() => {
    socketRef.current = io.connect(SERVER_URL);
    getLocalStream();

    socketRef.current.on(
      'all_users',
      (allUsers: Array<{ id: string; email: string }>) => {
        allUsers.forEach(async user => {
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(user.id, user.email);
          if (!(pc && socketRef.current)) return;
          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log('create offer success');
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            socketRef.current.emit('offer', {
              sdp: localSdp,
              offerSendID: socketRef.current.id,
              offerSendEmail: 'offerSendSample@sample.com',
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      },
    );

    socketRef.current.on(
      'getOffer',
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string;
        offerSendEmail: string;
      }) => {
        const { sdp, offerSendID, offerSendEmail } = data;
        console.log('get offer');
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendEmail);
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log('answer set remote description success');
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit('answer', {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      },
    );

    socketRef.current.on(
      'getAnswer',
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log('get answer');
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      },
    );

    socketRef.current.on(
      'getCandidate',
      async (data: {
        candidate: RTCIceCandidateInit;
        candidateSendID: string;
      }) => {
        console.log('get candidate');
        const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log('candidate add success');
      },
    );

    socketRef.current.on('user_exit', (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers(oldUsers => oldUsers.filter(user => user.id !== data.id));
    });

    // 댓글 받는 부분
    socketRef.current?.on('receive_message', (data: any) => {
      setCommentData((_: any) => [..._, data]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      users.forEach(user => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPeerConnection, getLocalStream]);

  const sendMessage = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // socket 댓글 연결파트
      setMsg('');
      socketRef.current?.emit('message', {
        message: event.currentTarget.value,
        room: room_id,
        emoji: localStorage.getItem(USER_ICON_KEY),
        nickname: localStorage.getItem(USER_NAME_KEY),
      });
    }
  };

  const setMsgContents = (event: ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  useEffect(() => {
    room_id &&
      axios.get(`${BASE_URL}channel/${room_id}`).then(res => {
        setVideoInfor(res.data);
      });
  }, [room_id]);

  return (
    <Wrapper>
      <video muted ref={localVideoRef} autoPlay />
      <div>
        {users.map((user, index) => (
          <Video key={index} stream={user.stream} />
        ))}
      </div>
      <Container>
        <TopBar>
          {videoInfor && (
            <VideoDetailInfor
              videoInfor={{
                profile_emoji: videoInfor.profile_emoji,
                profile_name: videoInfor.profile_name,
                thumbnail: '',
                title: videoInfor.title,
                constructor: 'd',
              }}
            />
          )}
          <div className="live">LIVE</div>
        </TopBar>
        <BottomBar>
          <Comment data={commentData} />
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="댓글을 입력해 주세요."
              onKeyDown={sendMessage}
              onChange={setMsgContents}
              value={msg}
            />
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
  & video {
    width: 100%;
    height: 50%;
    background-color: #d1d1d1;
    &:nth-of-type(2) {
      background-color: #999999;
    }
    object-fit: cover;
    transform: scaleX(-1);
  }
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
