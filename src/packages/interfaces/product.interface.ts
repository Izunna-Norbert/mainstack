export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  brand?: string;
}

export interface IPagination {
  page: number;
  limit: number;
}

export interface RGetProducts {
  products: IProduct[];
  total: number;
}

export interface IGetProductById {
  id: string;
}

export interface IGetProductByName {
  name: string;
}

export interface IGetProducts extends IPagination {}
export interface IUpdateProductById extends IGetProductById, IProduct {}
export interface IDeleteProductById extends IGetProductById {}
export interface IGetProductByCategory extends IPagination {
  category: string;
}

export interface RProductResponse {
  success: boolean;
  message: string;
  data: IProduct[] | IProduct | null;
  total?: number;
  error?: string;
}
