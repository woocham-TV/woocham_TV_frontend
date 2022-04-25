import React from 'react';
import styled from '@emotion/styled';
import woocham_logo from '../../../public/images/woocham_logo.png';
import video_icon from '../../../public/images/video_icon.svg';
import RoutingButton from './RoutingButton';

export default function Header() {
  return (
    <Wrapper>
      <RoutingButton src={woocham_logo} href="/live/list" />
      <RoutingButton src={video_icon} href="/live/ready" />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;
