import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    productName: string, 
    productPrice: string
}

const ProductSchema: Schema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: String, required: true }
})

export const Product = mongoose.model<IProduct>('Product', ProductSchema)