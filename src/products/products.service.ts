/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  // Array to store products.
  private products: IProduct[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>,
  ) {}

  // Method to insert a new product in to database with the provided details.
  // Convert in to clean JavaScript object without Mongoose-specific details
  // Returns the newly added product.
  async insertProduct(title: string, description: string, price: number): Promise<IProduct> {
    const newProduct = (await this.productModel.create({ title, description, price })).toJSON();
    return { ...newProduct };
  }

  // Method to retrieve a list of products.
  async getProducts(): Promise<IProduct[]> {
    const products = await this.productModel.find().exec();
    return [...products];
  }

  // Method to retrieve a product by its unique identifier.
  async getProductById(id: string) {
    const product = await this.findProductById(id);
    return { ...product };
  }

  // Method to update a product by its unique identifier.
  // Merges the existing product with the provided data.
  async updateProduct(id: string, productData: { title: string; description: string; price: number }): Promise<IProduct> {
    const updatedProduct = (await this.productModel.findByIdAndUpdate(id, productData).exec()).toJSON();
    return { ...updatedProduct };
  }

  // Method to delete a product by its unique identifier.
  async deleteProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    return { ...product };
  }

  // Method to retrieve a product by its unique identifier.
  // Throws a NotFoundException if the product is not found.
  private async findProductById(id: string): Promise<IProduct> {
  try {
    const product = (await this.productModel.findById(id).exec()).toJSON();
    // If the product is not found, throw a NotFoundException.
    if (!product) {
      throw new NotFoundException(`Could not find the product.`);
    }
    return {...product};
  } catch (error) {
    // Handle other errors or rethrow them
    throw new NotFoundException(`Failed to retrieve product by ID: ${id}. ${error.message}`);
  }
}
}