/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';

@Module({
    // No additional modules are imported in this module.
    imports: [],
    // No additional modules are imported in this module.
    controllers: [ProductController],
    // No additional modules are imported in this module.
    providers: [ProductService]
})
export class ProductsModule {}
