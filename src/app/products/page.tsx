import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ProductsClient = dynamic(() => import('./ProductsClient'), {
  ssr: false,
});

const Products = () => {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <ProductsClient />
    </Suspense>
  );
};

export default Products;
