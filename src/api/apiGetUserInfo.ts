import { UserInfo } from '@/types/userType';
import axios from 'axios';

export const apiGetUserInfo = async (
  token: string
): Promise<UserInfo | null> => {
  const url = 'https://dummyjson.com/auth/me';
  try {
    const { data } = await axios.get<UserInfo>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};
