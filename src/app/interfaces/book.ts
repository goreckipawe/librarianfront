import { ICategory } from './category';

export interface IBook {
  id_book: number,
  title: string,
  description: string,
  year_of_publishment: number,
  date_of_creation: string,
  created_at: string,
  updated_at: string,
  deleted_at: string,
  categories: ICategory[],
}
