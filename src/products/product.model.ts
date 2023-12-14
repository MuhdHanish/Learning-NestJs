/* eslint-disable prettier/prettier */

import * as mongoose from "mongoose";

// Database schema representation of product.
export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

// Class representing a Product entity with best practice using public fields in the constructor.
export interface IProduct extends mongoose.Document {
    _id: string;
    title: string;
    description: string;
    price: number;
}