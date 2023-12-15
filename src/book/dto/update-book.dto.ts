/* eslint-disable prettier/prettier */
import { Category } from '../schemas/book.schema';

export class UpdateBookDTO {
  readonly title: string;
  readonly description: string;
  readonly category: Category;
  readonly author: string;
  readonly price: number;
}
