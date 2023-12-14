/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductBestPractice } from './product.model';

@Injectable()
export class ProductService {
  // Counter for generating unique identifiers.
  private idCount: number = 1;

  // Array to store products.
  private products: ProductBestPractice[] = [];

  // Method to insert a new product with the provided details.
  // Returns the unique identifier (id) of the newly added product.
  insertProduct(title: string, description: string, price: number): string {
    // Generate a unique id for the new product.
    const id = (this.idCount++).toString();
    // Create a new product instance with the provided details.
    const newProdcut = new ProductBestPractice(id, title, description, price);
    // Add the new product to the products array.
    this.products.push(newProdcut);
    return id;
  }

  // Method to retrieve a list of products.
  // Returns a deep copy of the products array to prevent direct modification.
  getProducts(): ProductBestPractice[] {
    // Create a deep copy of the products array using JSON parsing.
    const products = JSON.parse(JSON.stringify(this.products));
    return products;
  }

  // Method to retrieve a product by its unique identifier.
  // Returns a deep copy of the found product to prevent direct modification.
  getProductById(id: string): ProductBestPractice {
    const [product] = this.findProductById(id);
    // Return a deep copy of the found product.
    return { ...product };
  }

  // Method to update a product by its unique identifier.
  // Merges the existing product with the provided data.
  updateProduct(
    id: string,
    productData: { title: string; description: string; price: number },
  ): ProductBestPractice {
    const [product, index] = this.findProductById(id);
    const updatedProduct = { ...product, ...productData };
    // If any of the properties in productData is null or undefined, retain the original value.
    this.products[index] = updatedProduct;
    return { ...updatedProduct };
  }

  // Method to delete a product by its unique identifier.
  deleteProduct(id: string): ProductBestPractice {
      const [product, index] = this.findProductById(id);
      this.products.splice(index, 1);
      return { ...product };
  }

  // Method to retrieve a product by its unique identifier.
  // Throws a NotFoundException if the product is not found.
  // Returns the product and it's index.
  private findProductById(id: string): [ProductBestPractice, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    const product = this.products[productIndex];
    // If the product is not found, throw a NotFoundException.
    if (!product) {
      throw new NotFoundException(`Could not found the product.`);
    }
    return [product, productIndex];
  }
}