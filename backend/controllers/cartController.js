import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body // userId coming from auth.js middleware whereas itemId and cart data from the frontend
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData; // cartData is an arr of objects
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else { // an obj of this itemId does'nt exist in DB -> so gonna create a new obj
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: 'Added to cart'})

    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

const updateCart = async (req, res) => { // update quantity or remove product from db
    try {
        const { userId, itemId, size, quantity } = req.body // quantity -> new quantity of product
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: 'Cart updated'})
        
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData
        res.json({success: true, message: 'cart data fectched', cartData})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addToCart, updateCart, getUserCart }