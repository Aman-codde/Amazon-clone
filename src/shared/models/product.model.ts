import * as mongoose from 'mongoose';
import {Category} from './category.model.js';
export interface Product {
    _id?:{type: mongoose.Types.ObjectId}
    product_name: string,
    price: number,
    quantity: number,
    imgUrl?: string,
    categories?: Category[],
    isValid: boolean,
    category_name?: string
}