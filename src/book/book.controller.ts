/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query  } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDTO, UpdateBookDTO } from './dto';

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    
    @Get()
    async getBooks(@Query() query: { search: string; page: string; }): Promise<{ books: Book[] }>{
        const books = await this.bookService.findBooks(query);
        return { books };
    }

    @Get(':id')
    async getBookById(@Param('id') id: string): Promise<{ book: Book }>{
        const book = await this.bookService.findBookById(id);
        return { book };
    }

    @Post()
    async createBook(@Body() bookData: CreateBookDTO): Promise<{ book: Book }>{
        const book = await this.bookService.createBook(bookData);
        return { book };
    }

    @Patch(':id')
    async updateBook(@Param('id') id: string, @Body() bookData: UpdateBookDTO): Promise<{ book: Book }>{
        const book = await this.bookService.updateById(id,bookData);
        return { book };
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string) {
        const book = await this.bookService.deleteById(id);
        return { book };
    }
}
