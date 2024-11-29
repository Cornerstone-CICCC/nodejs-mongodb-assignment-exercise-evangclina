import { Request, Response } from "express";
import { Product } from "../models/product.model";

//get all products
const getAllProducts = async (req: Request, res: Response) => {
    try{
        const products = await Product.find()
        res.json(products)
    }catch(e){
        console.error(e)
        res.status(500).json({ error: "Unable to get all products" })
    }
}

//get product by id 
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({ error: 'Product does not exist' })
            return
        }
        res.json(product)
    }catch(e){
        console.error(e)
        res.status(500).json({ error: "Unable to get product" })
    }  
}

const addProduct = async (req: Request, res: Response) => {
    try{
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    }catch(e){
        console.error(e)
        res.status(500).json()
    } 
}

const updateProductById = async (req: Request<{ id: string }>, res: Response) =>{
    try{
        const upatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if(!upatedProduct){
            res.status(404).json({ error: "Product does not exist" })
        }
        res.status(201).json(upatedProduct)
    }catch(e){
        console.error(e)
        res.status(500).json({ error: 'Unable to update product' })
    }
}

const deleteProductById = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if(!deletedProduct){
            res.status(404).json({ error: "Product does not exist" })
        }
        res.json(deletedProduct)
    }catch(e){
        console.error(e)
        res.status(500).json({ error: "Unable to delete product" })
    }
}

export default{
    getAllProducts, 
    getProductById,
    addProduct, 
    updateProductById, 
    deleteProductById
}