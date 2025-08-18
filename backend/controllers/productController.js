import productModel from '../models/productModel.js'
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
        const images = []
        if (req.files?.image1) images.push(req.files.image1[0].filename)
        if (req.files?.image2) images.push(req.files.image2[0].filename)
        if (req.files?.image3) images.push(req.files.image3[0].filename)
        if (req.files?.image4) images.push(req.files.image4[0].filename)

        const allowedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
       let sizeArray = []
       if (Array.isArray(sizes)) {
        sizeArray = sizes
       } else {
        try {
            sizeArray = JSON.parse(sizes)
        } catch (e) {
            sizeArray = sizes.split(",")
        }
       }
       sizeArray = sizeArray.map(s => s.trim().toUpperCase()).filter(s => allowedSizes.includes(s))
       if (sizeArray.length === 0) {
        return res.json({ success: false, message: "invalid sizes" })
       }
        // storing product in DB
        const newProduct = new productModel({
            name,
            description,
            price: priceNum,
            sizes: sizeArray,
            bestseller: bestseller || false,
            category,
            subCategory,
            image: images,
            date: Date.now()
        })
        await newProduct.save() // save in DB
        res.json({ success: true, message: "product saved in DB", product: newProduct })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// function to remove product
const removeProduct = async (req, res) => {

}

// to listProducts
const listProduct = async (req, res) => {

}

// for single product
const singleProduct = async (req, res) => {

}

export { addProduct, listProduct, removeProduct, singleProduct }