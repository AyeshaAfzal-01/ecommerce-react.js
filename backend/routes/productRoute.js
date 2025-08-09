import express from "express"
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.js'

// create router
const productRouter = express.Router()

// routes using productRouter
productRouter.post('/add', addProduct)
productRouter.post('/remove', removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProduct)

export default productRouter