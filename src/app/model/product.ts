import { Category } from './category';

export interface Product {
  idProduct?: number;
  lib: string;
  price: number;
  qte: number;
  category: {
    id_category: number;
    name?: string;
  };
}
