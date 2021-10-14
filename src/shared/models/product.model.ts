import * as mongoose from 'mongoose';
export interface Product {
    _id?:{type: mongoose.Types.ObjectId}
    name: string,
    price: number,
    quantity: number,
    imgUrl?: string,
    categories?: [string],
    isValid: boolean
}