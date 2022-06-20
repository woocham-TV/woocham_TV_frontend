import styled from '@emotion/styled';
import { useEffect } from 'react';

export default function Comment({ data }: any) {
  useEffect(() => {
    document
      .getElementById('comment_wrap')
      ?.scrollTo(
        0,
        document.getElementById('comment_wrap')?.scrollHeight as number,
      );
  }, [data]);
  return (
    <ListWrapper id="comment_wrap">
      {data.map((_: any, idx: number) => (
        <CommentWrapper key={idx}>
          <CommentContainer>
            <h1>{_.emoji}</h1>
            <div>
              <span>{_.nickname} 님</span>
              <p>{_.message}</p>
            </div>
          </CommentContainer>
        </CommentWrapper>
      ))}
    </ListWrapper>
  );
}

const CommentWrapper = styled.div`
  display: flex;
`;

const CommentContainer = styled.div`
  border-radius: 5px;
  padding: 10px;
  background: rgb(0, 0, 0, 0.4);
  display: flex;
  gap: 5px;
  color: white;
  padding-top: 5px;
  & h1 {
    font-size: 23px;
    padding: 0px;
  }
  & div {
    & span {
      font-size: 11px;
    }
    & p {
      font-size: 13px;
      font-weight: bold;
    }
  }
`;

const ListWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 300px;
  overflow: scroll;
`;
