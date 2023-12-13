/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductBestPractice } from './product.model';

@Injectable()
export class ProductService {
    private idCount: number = 1;
    private products: ProductBestPractice[] = [];
    
    insertProduct(title: string, description: string, price: number): string {
        const id = (this.idCount++).toString();
        const newProdcut = new ProductBestPractice(id, title, description, price);
        this.products.push(newProdcut);
        return id;
    }

    getProducts(): ProductBestPractice[] {
        // Cant edit the data on the controller
        const products = JSON.parse(JSON.stringify(this.products));
        return products;
    }
}