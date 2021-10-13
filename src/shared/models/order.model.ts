import { Address } from 'cluster';
import * as mongoose from 'mongoose';
export interface Order {
    id? : mongoose.Types.ObjectId;
    userId: string; // userId is email of user
    paymentStatus: string; // processed, paid etc.
    orderStatus: string; //shipped, delivered
    amount: number;
    items: [
        {
        itemId: string;// should be linked to product id
        quantity: number;
        price: number;
        // additional fields- discount, pretax, aftertax
        }
    ];
    shippingAddress: Address;
    billingAddress: Address;
}