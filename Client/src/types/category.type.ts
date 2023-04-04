import { IProduct } from "./products.type";



export interface ICategory {
  createdAt: string;
  name: string;
  products: Pick<IProduct,"_id">[];
  updatedAt: string;
  _id: string;
}
