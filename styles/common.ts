import styled from '@emotion/styled';

export const PublicInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: #fcfcfc;
  padding-left: 15px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  color: black;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #5d5d5d;
  }
`;

export const PublicButton = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 5px;
  background-color: #0545b1;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export const PublicTitle = styled.h1`
  color: #363636;
  font-size: 16px;
  font-weight: bold;
`;

export const PublicContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
