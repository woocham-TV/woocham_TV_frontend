import styled from '@emotion/styled';
import { UserIcons } from '../../constants/userIcon';
import { UserIcon } from '../../typings/user';

interface Props {
  icon: UserIcon;
  setIcon(icon: UserIcon): void;
}

export default function IconSelect({ icon, setIcon }: Props) {
  return (
    <IconContainer>
      {UserIcons.map((ele, index) => (
        <IconSelector
          key={index}
          onClick={() => {
            setIcon(ele);
          }}
          style={
            ele === icon
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
