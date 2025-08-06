'use client';

import { debounce, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      newSearchParams.set('q', searchTerm);
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('q');
    }
    router.push(`/products?${newSearchParams.toString()}`);
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      handleSearch();
    }, 500),
    [handleSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch();
  };

  return (
    <TextField
      variant='outlined'
      placeholder='Пошук товарів'
      className=' w-full'
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleSearch();
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBox;
