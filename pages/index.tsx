import { useEffect } from 'react';
import Login from '../components/Login';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from './../modules/recoil/user';

export default function login() {
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (user.icon && user.name) {
      router.push('/live/list');
    }
  }, [user]);
  return <Login />;
}
