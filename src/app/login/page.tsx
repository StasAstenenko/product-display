'use client';

import { login } from '@/api/apiLogin';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

interface InitialValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useRouter();

  const initialValues: InitialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Мінім 3 символи')
      .max(10, 'Максимум 10 символів')
      .required("Ім'я є обов'язковим"),
    password: Yup.string()
      .min(4, 'Мінімум 4 символи')
      .max(16, 'Максимум 16 символів')
      .required("Пароль є обов'язковим"),
  });

  const handleSubmit = async (values: InitialValues) => {
    const { username, password } = values;
    const user = await login(username, password);
    if (!user) return;
    localStorage.setItem('token', user.accessToken);
    navigate.push('/products');
    return user;
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50 px-4'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className='flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-xl shadow-md'>
          <h2 className='text-2xl font-bold text-center text-blue-600'>
            Увійдіть у систему
          </h2>

          <div>
            <Field
              name='username'
              type='text'
              placeholder='Ім’я користувача'
              className='border border-gray-300 rounded px-3 py-2 w-full'
            />
            <ErrorMessage
              name='username'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>

          <div>
            <Field
              name='password'
              type='password'
              placeholder='Пароль'
              className='border border-gray-300 rounded px-3 py-2 w-full'
            />
            <ErrorMessage
              name='password'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>

          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer'
          >
            Увійти
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
