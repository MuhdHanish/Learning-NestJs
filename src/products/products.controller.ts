/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  // Endpoint to add a new product by providing individual properties in the request body.
  //   @Post()
  // Extracting data from the request body one by one using the @Body decorator.
  // Each property (title, description, price) is specified individually.
  //   insertProduct(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //     @Body('price') price: number,
  //   ): { id: string } {
  //     const id = this.prodcutService.insertProduct(title, description, price);
  //     return { id };
  //   }

  // Endpoint to add a new product by providing complete data in the request body.
  @Post()
  // Extracting complete data from the request body using the @Body decorator.
  // The ICompleteBody interface defines the expected structure of the request body.
  insertProduct(@Body() completeBody: ICompleteBody): { id: string } {
    const { title, description, price } = completeBody;
    const id = this.prodcutService.insertProduct(title, description, price);
    return { id };
  }

  // Fetching the list of products from the productService.
  // The returned array is wrapped in an object for a consistent response format.
  @Get()
  getProducts(): { products: ProductBestPractice[] } {
    const products = this.prodcutService.getProducts();
    return { products };
  }

  // Endpoint to retrieve a product by its unique identifier (id) from the URL parameter.
  @Get(`:id`)
  // Extracting the 'id' parameter from the request URL.
  getProductById(@Param('id') id: string): { product: ProductBestPractice } {
    const product = this.prodcutService.getProductById(id);
    return { product };
  }

  // Endpoint to update a product using its unique identifier (id) from the URL parameter.
  @Patch(`:id`)
    // Extracting the 'id' parameter from the request URL.
    // Extracting complete data from the request body using the @Body decorator.
  updateProduct(
    @Param('id') id: string,  @Body() completeBody: ICompleteBody): { product: ProductBestPractice } {
    const product = this.prodcutService.updateProduct(id, completeBody);
    return { product };
  }

  // Endpoint to delete a product using its unique identifier (id) from the URL parameter.
  @Delete(`:id`)
  // Extracting the 'id' parameter from the request URL.
  deleteProduct(@Param('id') id: string): { product: ProductBestPractice }{
    const product = this.prodcutService.deleteProduct(id);
    return { product };
  }
}
