import styled from '@emotion/styled';
import { UserIcons } from '../../constants/userIcon ';

interface Props {
  idx: number;
  setIdx(n: number): void;
}

export default function IconSelect({ idx, setIdx }: Props) {
  return (
    <IconContainer>
      {UserIcons.map((ele, index) => (
        <IconSelector
          key={index}
          onClick={() => {
            setIdx(index);
          }}
          style={
            idx === index
              ? { backgroundColor: '#7bacff' }
              : { backgroundColor: '#f2f2f2' }
          }
        >
          {ele}
        </IconSelector>
      ))}
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  justify-items: center;
  row-gap: 10px;
`;

const IconSelector = styled.button`
  width: 50px;
  height: 50px;
  background-color: #f2f2f2;
  border-radius: 50%;
  font-size: 24px;
`;
