/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards  } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDTO, UpdateBookDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';

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
    @UseGuards(AuthGuard('jwt'))
    async createBook(@Body() bookData: CreateBookDTO, @Req() req): Promise<{ book: Book }>{
        const book = await this.bookService.createBook(bookData, req.user);
        return { book };
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateBook(@Param('id') id: string, @Body() bookData: UpdateBookDTO, @Req() req): Promise<{ book: Book }>{
        const book = await this.bookService.updateById(id,bookData, req.user);
        return { book };
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteBook(@Param('id') id: string, @Req() req) {
        const book = await this.bookService.deleteById(id, req.user);
        return { book };
    }
}
