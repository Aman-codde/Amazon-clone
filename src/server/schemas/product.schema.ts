import mongoose from 'mongoose';
import type { Product } from '../../shared/models/product.model';
const {Schema, model} = mongoose

const productSchema = new Schema<Product>({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    imgUrl: {type: String},
    categories: [{type: mongoose.Types.ObjectId, ref:'Category'}],
})

export const ProductModel = model<Product>('Product',productSchema)
