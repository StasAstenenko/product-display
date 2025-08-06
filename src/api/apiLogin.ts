import axios from 'axios';

interface Login {
  accessToken: string;
}

interface Refresh {
  refreshToken: string;
}

export const login = async (
  username: string,
  password: string
): Promise<Login | null> => {
  const url = 'https://dummyjson.com/auth/login';
  try {
    const { data } = await axios.post<Login>(
      url,
      {
        username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const refreshToken = async (): Promise<Refresh | null> => {
  const url = 'https://dummyjson.com/auth/refresh';

  try {
    const { data } = await axios.post<Refresh>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
