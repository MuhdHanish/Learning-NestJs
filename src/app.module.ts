/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(`mongodb://127.0.0.1:27017/Nest-Learn`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
