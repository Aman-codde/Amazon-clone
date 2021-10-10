import * as mongoose from 'mongoose';
export interface Product {
    _id?:{type: mongoose.Types.ObjectId}
    name: string,
    price: number,
    quantity: number,
    imgUrl?: string,
    category: string,
    subCategory?: string, // (men,women,boy,girl etc)
    author?: string,// book
    colors?: [string], // clothes etc
    sizes?: [string], // clothes(S,XS,M,L,Xl etc.)
}