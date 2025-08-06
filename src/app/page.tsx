import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className='bg-blue-600 text-white py-6 px-4 shadow-md w-full flex justify-center mb-10'>
        <h1 className='text-3xl font-bold text-center sm:text-left'>
          Ласкаво Просимо
        </h1>
      </header>

      <main className='flex flex-col gap-8 items-center justify-center py-10 px-6 bg-white shadow rounded-2xl max-w-xl w-full mx-auto'>
        <h2 className='text-xl font-semibold text-gray-800 text-center'>
          Щоб увійти натисніть на кнопку
        </h2>
        <Link
          href='/login'
          className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300'
        >
          Увійти
        </Link>
      </main>
    </>
  );
}
