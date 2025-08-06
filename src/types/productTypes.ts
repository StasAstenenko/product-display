export interface GetProduct {
  id: string;
  title: string;
  price: string;
  brand: string;
  images: [string];
}

export interface GetProducts {
  products: GetProduct[];
  total: number;
  skip: number;
  limit: number;
}
