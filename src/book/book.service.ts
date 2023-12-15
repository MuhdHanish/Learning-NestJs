/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private readonly bookModel: Model<Book>
    ) { }

    async findBooks(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async createBook(bookData: Book): Promise<Book> {
        const createdBook = await this.bookModel.create(bookData);
        return createdBook.toJSON();
    }

    async findBookById(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book.toJSON();
    }

    async updateById(id: string,bookData: Book): Promise<Book> {
        const book = await this.bookModel.findByIdAndUpdate(id,bookData,{ new: true, runValidators: true }).exec();
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
