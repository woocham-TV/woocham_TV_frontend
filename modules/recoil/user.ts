import { atom } from 'recoil';
import { User } from '../../typings/user';
import { UserIcons } from '../../constants/userIcon';

export const userState = atom<User>({
  key: 'userState',
  default: {
    icon: UserIcons[0],
    name: null,
  },
});
