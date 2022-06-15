import MainLayer from '../Layout';
import styled from '@emotion/styled';
import { PublicInput, PublicButton, PublicTitle } from '../../styles/common';
import { useState, ChangeEvent } from 'react';
import { getFileData } from './../../utils/getFileData';
import axios from 'axios';
import { USER_ICON_KEY, USER_NAME_KEY } from './../../constants/localstorage';
import { BASE_URL } from '../../constants/url';
import { useRouter } from 'next/router';

export default function ReadyToBroadcast() {
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState<null | string>(null);
  const [file, setFile] = useState<any>(null);
  const router = useRouter();

  const thumbnailUpload = (event: ChangeEvent<HTMLInputElement>) => {
    getFileData(event).then(res => {
      setPreview(res.preview);
      setFile(res.file);
    });
  };

  const createLiveRoom = () => {
    const fd = new FormData();
    fd.append(`thumbnail`, file);
    axios
      .post(
        `${BASE_URL}channel?constructor=${localStorage.getItem(
          USER_NAME_KEY,
        )}&title=${title}&profile_name=${localStorage.getItem(
          USER_NAME_KEY,
        )}&profile_emoji=${localStorage.getItem(USER_ICON_KEY)}`,
        fd,
      )
      .then(() => {
        router.push(`/live/room?id=${localStorage.getItem(USER_NAME_KEY)}`);
      });
  };
  return (
    <MainLayer>
      <Title>방송 시작 준비</Title>
      <Input
        placeholder="방송 제목을 입력하세용~!"
        onChange={event => {
          setTitle(event.target.value);
        }}
      />
      <label htmlFor="thumbnail_upload">
        {preview ? (
          <ThumbnailImg src={preview} />
        ) : (
          <ThumbnailSelector>
            <input
              type="file"
              id="thumbnail_upload"
              onChange={thumbnailUpload}
            />
            <span>여기를 눌러 썸네일을 선택하세요</span>
          </ThumbnailSelector>
        )}
      </label>
      <Button onClick={createLiveRoom}>방송 시작</Button>
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

const ThumbnailImg = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 5px;
  margin-top: 10px;
`;

const ThumbnailSelector = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px dashed #8a8a8a;
  display: flex;
  justify-content: center;
  align-items: center;
  & span {
    color: #848484;
    font-size: 14px;
  }
  & input[type='file'] {
    display: none;
  }
`;
