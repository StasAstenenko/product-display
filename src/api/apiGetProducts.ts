import { GetProduct } from '@/types/productTypes';
import axios from 'axios';

interface GetProductsParams {
  limit?: number;
  skip?: number;
}

interface GetProducts {
  products: GetProduct[];
  total: number;
  skip: number;
  limit: number;
}

export const apiGetProducts = async ({
  limit = 12,
  skip = 0,
}: GetProductsParams) => {
  try {
    const { data } = await axios.get<GetProducts>(
      'https://dummyjson.com/products',
      {
        params: {
          limit,
          skip,
        },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
};
