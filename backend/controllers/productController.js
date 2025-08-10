// controller function to add the products
// function for add product
const addProduct = async (req, res) => {
// use middleware using multer -> so if i send any file as data then that file will be parsed using multer
    try {
        // get product details from body
        const {name, description, price, category, subCategory, sizes, bestseller } = req.body;
        // get images
        const image1 = req.files.image1[0] // this image1 will be an arr and we are taking the first element of this arr
        const image2 = req.files.image2[0]
        const image3 = req.files.image3[0]
        const image4 = req.files.image4[0]

        console.log(name, description, price, category, subCategory, sizes, bestseller)
        console.log(image1, image2, image3, image4)

        res.json({})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

// function for list product
const listProduct = async (req, res) => {

}

// function for remove product
const removeProduct = async (req, res) => {

}

// function fro single product
const singleProduct = async (req,res) => {

}

export { addProduct, listProduct, removeProduct, singleProduct }

// now these 4 controllers will be mounted on four diff routes