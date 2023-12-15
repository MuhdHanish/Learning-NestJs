/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
    ADVENTURE = 'Adventure',
    CLASSIC = 'Classic',
    CRIME = 'Crime',
    FANTASY = 'Fantasy'
}

@Schema({
  timestamps: true
})
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true, min: 0, validate: [priceValidator, 'Price must be greater than zero'] })
    price: number;

    @Prop()
    category: Category;
}

function priceValidator(value: number): boolean {
  return value > 0;
}

export const bookSchema = SchemaFactory.createForClass(Book);