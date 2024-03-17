/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsEnum(Category, { message: 'Please enter a correct category' })
  @IsNotEmpty()
  readonly category: Category;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
