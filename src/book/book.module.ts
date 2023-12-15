/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: bookSchema }])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
