import axios from 'axios';

interface Categories {
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  url: string;
  slug: string;
}

export const apiGetCategories = async (): Promise<Categories | null> => {
  try {
    const { data } = await axios.get<Categories>(
      'https://dummyjson.com/products/categories'
    );
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
};
