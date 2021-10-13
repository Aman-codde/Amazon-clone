import * as mongoose from 'mongoose';
export interface Product {
    _id?:{type: mongoose.Types.ObjectId}
    name: string,
    price: number,
    quantity: number,
    imgUrl?: string,
    category: string,// clothing,
    subCategory: string,
    author?: string,// book
    colors?: [string], // clothes etc
    sizes?: [string], // clothes(S,XS,M,L,Xl etc.)
}