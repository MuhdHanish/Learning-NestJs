/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDTO, UpdateBookDTO } from './dto';

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

    async createBook(bookData: CreateBookDTO): Promise<Book> {
        const createdBook = await this.bookModel.create(bookData);
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

    async updateById(id: string, bookData: UpdateBookDTO): Promise<Book> {
        const book = await this.bookModel.findByIdAndUpdate(id, bookData, { new: true, runValidators: true }).exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book.toJSON();
    }

    async deleteById(id: string) {
        const book = await this.bookModel.findByIdAndDelete(id).exec();
        if (!book) {
          throw new NotFoundException('Book not found');
        }
        return book;
    }
}
