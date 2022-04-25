import { useEffect } from 'react';
import Login from '../components/Login';
import { USER_NAME_KEY, USER_ICON_KEY } from './../constants/localstorage';
import { useRouter } from 'next/router';

export default function login() {
  const router = useRouter();

  useEffect(() => {
    const user_name = localStorage.getItem(USER_NAME_KEY);
    const user_icon = localStorage.getItem(USER_ICON_KEY);
    if (user_name && user_icon) {
      router.push('/live/list');
    }
  }, []);
  return <Login />;
}
