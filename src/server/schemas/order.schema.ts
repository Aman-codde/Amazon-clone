import mongoose from 'mongoose';
import { Order } from '../../shared/models/order.model';
const {Schema, model} = mongoose;

//const itemSchema = new Schema<>({})

const orderSchema = new Schema<Order>({
    userId: {type: String, required: true},
    amount: {type: Number, required: true},
    items: {}

})