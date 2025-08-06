'use client';

import { apiGetProducts } from '@/api/apiGetProducts';
import { apiGetUserInfo } from '@/api/apiGetUserInfo';
import ProductComponent from '@/components/ProductComponent';
import UserComponent from '@/components/UserComponent';
import { GetProduct } from '@/types/productTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import CategoryFilter from '@/components/CategoryFilter';
import { apiGetProductsByCategory } from '@/api/apiGetProductsByCategory';
import SearchBox from '@/components/SearchBox';
import { apiSearchProducts } from '@/api/apiSearchProducts';
import { refreshToken } from '@/api/apiLogin';

const LIMIT = 12;

const ProductsClient = () => {
  const navigate = useRouter();
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [products, setProducts] = useState<GetProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('q');
  const pageParams = searchParams.get('page');
  const page = pageParams ? parseInt(pageParams, 10) : 1;
  const [totalCount, setTotalCount] = useState(0);

  const skip = (page - 1) * LIMIT;

  useEffect(() => {
    const getUserInfo = async () => {
      let currentToken = token;
      setError(false);
      if (!currentToken) {
        const refreshedToken = await refreshToken();
        if (!refreshedToken) {
          setError(true);
          return;
        }

        currentToken = refreshedToken.refreshToken;
        localStorage.setItem('token', currentToken);
      }

      const user = await apiGetUserInfo(currentToken);
      if (!user) {
        setError(true);
        return;
      }

      setFirstName(user.firstName);
      setLastName(user.lastName);
    };

    getUserInfo();
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      if (category) {
        const data = await apiGetProductsByCategory(category);
        if (data?.products) {
          setProducts(data.products);
          setTotalCount(data.products.length);
        }
      } else if (search) {
        const data = await apiSearchProducts(search);
        if (data?.products) {
          setProducts(data.products);
          setTotalCount(data.products.length);
        }
      } else {
        const data = await apiGetProducts({ limit: LIMIT, skip });
        if (data) {
          setProducts(data.products);
          setTotalCount(data.total);
        }
      }

      setLoading(false);
    };

    fetchProducts();
  }, [skip, category, search]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', value.toString());
    navigate.push(`/products?${newSearchParams.toString()}`);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    navigate.push('/login');
  };

  const handleSearch = (query: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newSearchParams.set('q', query);
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('q');
    }
    navigate.push(`/products?${newSearchParams.toString()}`);
  };
  return (
    <Box sx={{ p: 2 }}>
      <div className='flex flex-row gap-4 w-full'>
        <UserComponent
          firstName={firstName}
          lastName={lastName}
          onLogOut={logOut}
        />
        <SearchBox onSearch={(e) => handleSearch(e)} />
      </div>

      <CategoryFilter />
      {loading ? (
        <Box display='flex' justifyContent='center' py={4}>
          <CircularProgress />
        </Box>
      ) : (
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
                <ProductComponent
                  brand={product.brand}
                  images={product.images}
                  price={product.price}
                  title={product.title}
                />
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
      )}
      {error && (
        <p className='text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md text-sm mt-2'>
          Щось пішло не так...
        </p>
      )}
    </Box>
  );
};

export default ProductsClient;
