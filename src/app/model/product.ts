import { Category } from './category';

export class Product {
  public id: number;
  public lib: string;
  public price: number;
  public qte: number;
  public category: Category;

  constructor(
    id: number,
    libelle: string,
    price: number,
    quantity: number,
    category: Category
  ) {
    this.id = id;
    this.lib = libelle;
    this.price = price;
    this.qte = quantity;
    this.category = category;
  }
}
