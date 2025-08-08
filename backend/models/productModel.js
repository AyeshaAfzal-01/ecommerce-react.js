import mongoose from "mongoose"

// creating schema
// schema: structure to create data in database
const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // required:true mandatory to provide the name otherwise will not store in database
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true},
    subCategory: { type: String, required: true},
    sizes: { type: Array, required: true},
    bestseller: { type: Boolean},
    date: { type: Number, required: true}
})

// creating model-> model require name and schema
const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel