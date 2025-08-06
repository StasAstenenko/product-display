'use client';

import { Box } from '@mui/material';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBox from '@/components/SearchBox';
import AuthenticatedUser from '@/components/AuthenticatedUser';
import ProductList from '@/components/ProductList';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (query: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newSearchParams.set('q', query);
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('q');
    }
    router.push(`/products?${newSearchParams.toString()}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <div className='flex flex-row gap-4 w-full'>
        <AuthenticatedUser />
        <SearchBox onSearch={handleSearch} />
      </div>

      <CategoryFilter />
      <ProductList />
    </Box>
  );
}
