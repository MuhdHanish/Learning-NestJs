/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDTO, UpdateBookDTO } from './dto';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private readonly bookModel: Model<Book>
    ) { }

    async findBooks(query: { search: string; page: string; }): Promise<Book[]> {

        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const options = query.search ? {
            title: {
                $regex: query.search,
                $options: 'i'
            }
        } : {};
        
        return this.bookModel.find({ ...options }).limit(resPerPage).skip(skip).exec();
    }

    async createBook(bookData: CreateBookDTO, user: User): Promise<Book> {
        const data = Object.assign(bookData, { user: user._id });
        const createdBook = await this.bookModel.create(data);
        return createdBook.toJSON();
    }

    async findBookById(id: string): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
            throw new BadRequestException('The provided ID is not valid');
        }
        const book = await this.bookModel.findById(id).exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book.toJSON();
    }

    async updateById(id: string, bookData: UpdateBookDTO, user: User): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
          throw new BadRequestException('The provided ID is not valid');
        }
        const book = await this.bookModel.findOneAndUpdate({ _id: id, user: user._id }, bookData, { new: true, runValidators: true }).exec();
        if (!book) {
            throw new UnprocessableEntityException('Book not found or you do not have permission to update it',);
        }
        return book.toJSON();
    }

    async deleteById(id: string, user: User) {
        const isValidId = mongoose.isValidObjectId(id);
        if (!isValidId) {
          throw new BadRequestException('The provided ID is not valid');
        }
        const book = await this.bookModel.findOneAndDelete({ _id: id, user: user._id }).exec();
        if (!book) {
          throw new UnprocessableEntityException('Book not found or you do not have permission to delete it');
        }
        return book;
    }
}
