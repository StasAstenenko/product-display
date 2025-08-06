'use client';

import { apiGetCategories, Category } from '@/api/apiGetCategories';
import {
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const searchParams = useSearchParams();
  const navigate = useRouter();

  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await apiGetCategories();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: SelectChangeEvent) => {
    const category = e.target.value as string;
    const newParams = new URLSearchParams(searchParams.toString());
    if (category) {
      newParams.set('category', category);
      newParams.set('page', '1');
    } else {
      newParams.delete('category');
    }
    navigate.push(`/products?${newParams.toString()}`);
  };

  return (
    <Box mb={2}>
      <FormControl fullWidth>
        <InputLabel>Категорія</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleChange}
          label='Категорія'
        >
          <MenuItem value=''>Усі категорії</MenuItem>
          {categories?.map((cat) => (
            <MenuItem key={cat.id} value={cat.slug}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategoryFilter;
