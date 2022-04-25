import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import woocham_logo from '../../../public/images/woocham_logo.png';
import search_icon from '../../../public/images/search_icon.svg';
import video_icon from '../../../public/images/video_icon.svg';

const Header = () => {
  return (
    <Wrapper>
      <Image src={woocham_logo} alt="" />
      <ButtonContainer>
        <Image src={search_icon} alt="" />
        <Image src={video_icon} alt="" />
      </ButtonContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
`;
