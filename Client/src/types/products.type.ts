export interface IProduct {
  categoryId: string;
  createdAt: string;
  description: string;
  image: string;
  name: string;
  price: string;
  updatedAt: string;
  _id: string;
  
}

export interface IDataResponseProduct {
  docs: IProduct[];
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: any;
  page: number;
  pagingCounter: number;
  prevPage: any;
  totalDocs: number;
  totalPages: number;
}
