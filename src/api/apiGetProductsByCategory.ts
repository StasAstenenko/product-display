import { GetProduct } from '@/types/productTypes';
import axios from 'axios';

interface GetProducts {
  products: GetProduct[];
}

export const apiGetProductsByCategory = async (
  category: string
): Promise<GetProducts | null> => {
  const url = `https://dummyjson.com/products/category/${category}`;
  try {
    const { data } = await axios.get<GetProducts>(url);
    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};
