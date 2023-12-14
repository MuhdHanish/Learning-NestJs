/* eslint-disable prettier/prettier */

// Class representing a Product entity.
export class Product {
    id: string;
    title: string;
    description: string;
    price: number;
    constructor(id: string, title: string, description: string, price: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
    };
}

// Class representing a Product entity with best practice using public fields in the constructor.
export class ProductBestPractice {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public price: number
    ){ };
}