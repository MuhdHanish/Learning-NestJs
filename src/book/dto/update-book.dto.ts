/* eslint-disable prettier/prettier */
import { IsEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/book.schema';
import { User } from '../../auth/schemas/user.schema';

export class UpdateBookDTO {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEnum(Category, { message: `Please enter a correct category` })
  @IsOptional()
  readonly category: Category;

  @IsString()
  @IsOptional()
  readonly author: string;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsEmpty({ message: 'User ID should not be included in the request body' })
  readonly user: User;
}
