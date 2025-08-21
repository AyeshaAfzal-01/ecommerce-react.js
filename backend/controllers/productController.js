import productModel from '../models/productModel.js'
import { v2 as cloudinary } from 'cloudinary'
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.json({ success: false, message: 'incomplete credentials' })
        }
        const priceNum = Number(price)
        if (isNaN(priceNum) || priceNum <= 0) {
            return res.json({ success: false, message: "price should be a positive number" })
        }

        // uploading images to cloudinary
        const uploadToCloudinary = (file) => { // function to upload a file to cloudinary
            return cloudinary.uploader.upload(file.path, {
                folder: "products",
                resource_type: "image"
            })
        }

        // getting image files from multer
        const files = [
            req.files?.image1?.[0],
            req.files?.image2?.[0],
            req.files?.image3?.[0],
            req.files?.image4?.[0]
        ].filter(Boolean) // remove undefined if some images are missing
        // console.log("files data from multer: ", files)
        // uploading all images all at once
        const results = await Promise.all(files.map(file => uploadToCloudinary(file)))
        // images is an array of imageUrLs
        const images = results.map(r => r.secure_url)
        if (images.length === 0) {
            return res.json({ success: false, message: "upload atleast one image of product" })
        }

        const newProduct = new productModel({
            name,
            description,
            price: priceNum,
            sizes: JSON.parse(sizes),
            bestseller: bestseller || false,
            category,
            subCategory,
            image: images,
            date: Date.now()
        })
        await newProduct.save() // save in DB
        res.json({ success: true, message: "Product Added", product: newProduct })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// function to remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "product removed" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// list product will get all the products from database
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find() // fetch products from DB
        res.json({ success: true, message: "Product data fetched successfully", products })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// fetch details of one product by id
const singleProduct = async (req, res) => { 
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        if (!product) {
            return res.json({success: false, message: "product not found"})
        }
        res.json({success:true, message:"product found", product})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

export { addProduct, listProduct, removeProduct, singleProduct }