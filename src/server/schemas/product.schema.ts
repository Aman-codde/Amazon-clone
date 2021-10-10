import mongoose from 'mongoose';
import type { Product } from '../../shared/models/product.model';
const {Schema, model} = mongoose

const productSchema = new Schema<Product>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    imgUrl: {type: String},
    category: {type: String},
    subCategory: {type: String},
    author: {type: String},
    colors: {type: [String]},
    sizes: {type: [String]},
})

export const ProductModel = model<Product>('Product',productSchema)
