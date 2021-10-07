import * as mongoose from 'mongoose';
export interface User {
    //id?: string,
    firstName: string,
    lastName?:string,
    email:string,// how to use id as email _id: email
    hashedPassword: string,
    billingAddress?: {
        street: string,
        city:string,
        state:string,
        zipcode: string
    }
    shippingAddress?: {
        street: string,
        city:string,
        state:string,
        zipcode: string
    }

}