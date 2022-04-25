import styled from '@emotion/styled';

export default function Comment() {
  return (
    <ListWrapper>
      <CommentWrapper>
        <CommentContainer>
          <h1>😀</h1>
          <div>
            <span>정지원 님</span>
            <p>안녕하세요</p>
          </div>
        </CommentContainer>
      </CommentWrapper>
      <CommentWrapper>
        <CommentContainer>
          <h1>😀</h1>
          <div>
            <span>정지원 님</span>
            <p>안녕하세요</p>
          </div>
        </CommentContainer>
      </CommentWrapper>
      <CommentWrapper>
        <CommentContainer>
          <h1>😀</h1>
          <div>
            <span>정지원 님</span>
            <p>안녕하세요</p>
          </div>
        </CommentContainer>
      </CommentWrapper>
      <CommentWrapper>
        <CommentContainer>
          <h1>😀</h1>
          <div>
            <span>정지원 님</span>
            <p>안녕하세요</p>
          </div>
        </CommentContainer>
      </CommentWrapper>
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
`;
