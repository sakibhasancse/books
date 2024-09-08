export interface Book {
  _id: string;
  title: string;
  isbn: string;
  price: number;
  author: string;
  category: string;
  reviews?: object[];
  discount?: number;
}
