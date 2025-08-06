import { Box } from '@mui/material';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBox from '@/components/SearchBox';
import AuthenticatedUser from '@/components/AuthenticatedUser';
import ProductList from '@/components/ProductList';

export default function ProductsClient() {
  return (
    <Box sx={{ p: 2 }}>
      <div className='flex flex-row gap-4 w-full'>
        <AuthenticatedUser />
        <SearchBox />
      </div>

      <CategoryFilter />
      <ProductList />
    </Box>
  );
}
