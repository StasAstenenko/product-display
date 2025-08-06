// components/AuthenticatedUser.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiGetUserInfo } from '@/api/apiGetUserInfo';
import { refreshToken } from '@/api/apiLogin';
import UserComponent from './UserComponent';
import { UserInfo } from '@/types/userType';

export default function AuthenticatedUser() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUser = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      const currentToken = token;
      setError(false);

      try {
        const userData = await apiGetUserInfo(currentToken);
        if (!userData) throw new Error();

        setUser({ firstName: userData.firstName, lastName: userData.lastName });
      } catch {
        const refreshed = await refreshToken();
        if (!refreshed) {
          setError(true);
          router.push('/login');
          return;
        }
        localStorage.setItem('token', refreshed.refreshToken);
        const userData = await apiGetUserInfo(refreshed.refreshToken);
        if (!userData) {
          setError(true);
          router.push('/login');
        } else {
          setUser({
            firstName: userData.firstName,
            lastName: userData.lastName,
          });
        }
      }
    };

    fetchUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return user ? (
    <UserComponent
      firstName={user.firstName}
      lastName={user.lastName}
      onLogOut={logOut}
    />
  ) : error ? (
    <p className='text-red-600'>Помилка завантаження користувача</p>
  ) : null;
}
