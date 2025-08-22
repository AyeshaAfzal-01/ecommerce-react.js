import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// placing order using COD method 
const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body // userId coming from auth.js rest of stuff from frontend
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false, // payment not delivered yet -> cash on delivery
            date: Date.now()
        }
  
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} }) // after placing order update user cart to empty
        res.json({ success: true, message: "COD order placed" })

    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// placing order using razorpay
const placeOrderRazorpay = async (req, res) => {

}

// placing order using stripe
const placeOrderStripe = async (req, res) => {

}

// All orders Data for admin panel
const AllOrders = async (req, res) => {
    try {
        const allOrders = await orderModel.find({}) // find() and find({}) are equivalent -> find({}) adds more clarity like find all documents without any condition
        res.json({success: true, message: 'all orders fetched', allOrders})
    } catch (error) {
        console.log(error)
        return res.json({success: false, message: error.message})
    }
}

// user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({success:true, message: 'order data fetched', orders})
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// update order status from admin panel
const updateStatus = async (req, res) => {

}

export { placeOrderCOD, placeOrderRazorpay, placeOrderStripe, AllOrders, userOrders, updateStatus }