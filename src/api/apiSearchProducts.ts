import { GetProduct } from '@/types/productTypes';
import axios from 'axios';

interface GetProducts {
  products: GetProduct[];
}

export const apiSearchProducts = async (
  query: string
): Promise<GetProducts | null> => {
  const url = `https://dummyjson.com/products/search?q=${query}`;
  try {
    const { data } = await axios.get<GetProducts>(url);
    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};
