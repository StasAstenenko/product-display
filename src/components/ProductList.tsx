'use client';

import ProductComponent from './ProductComponent';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetProduct } from '@/types/productTypes';
import { apiGetProductsByCategory } from '@/api/apiGetProductsByCategory';
import { apiSearchProducts } from '@/api/apiSearchProducts';
import { apiGetProducts } from '@/api/apiGetProducts';

const LIMIT = 12;

export default function ProductList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<GetProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const category = searchParams.get('category');
  const search = searchParams.get('q');
  const pageParams = searchParams.get('page');
  const page = pageParams ? parseInt(pageParams, 10) : 1;
  const skip = (page - 1) * LIMIT;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (category) {
          data = await apiGetProductsByCategory(category);
        } else if (search) {
          data = await apiSearchProducts(search);
        } else {
          data = await apiGetProducts({ limit: LIMIT, skip });
        }

        if (data?.products) {
          setProducts(data.products);
          setTotalCount(data.total || data.products.length);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [skip, category, search]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', value.toString());
    router.push(`/products?${newParams.toString()}`);
  };

  if (loading) {
    return (
      <Box display='flex' justifyContent='center' py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        component='ul'
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          p: 0,
          m: 0,
          listStyle: 'none',
        }}
      >
        {products?.map((product) => (
          <li key={product.id}>
            <ProductComponent {...product} />
          </li>
        ))}
      </Box>

      {!category && (
        <Box display='flex' justifyContent='center' mt={4}>
          <Pagination
            count={Math.ceil(totalCount / LIMIT)}
            page={page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      )}
    </>
  );
}
