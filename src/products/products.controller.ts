/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductBestPractice } from './product.model';

interface ICompleteBody {
  title: string;
  description: string;
  price: number;
}

@Controller(`products`)
export class ProductController {
  constructor(private readonly prodcutService: ProductService) {}

  //   Taking data from the body one by one
  //   @Post()
  //   insertProduct(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //     @Body('price') price: number,
  //   ): { id: string } {
  //     const id = this.prodcutService.insertProduct(title, description, price);
  //     return { id };
  //   }

  //   Taking complete data from the body
  @Post()
  insertProduct(@Body() completeBody: ICompleteBody): { id: string } {
    const { title, description, price } = completeBody;
    const id = this.prodcutService.insertProduct(title, description, price);
    return { id };
  }

  @Get()
  getProducts(): { products: ProductBestPractice[] } {
    const products = this.prodcutService.getProducts();
    return { products };
  }
}
