import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

// global variables
const currency = 'pkr'
const deliveryCharge = 10
// gateway intialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers // original frontend url

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1 // quantity one bcz here just added delivery charges
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, // if payment successful then user will be redirected to the success page
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`, // if payment order cancel redirect to cancel url
            line_items,
            mode: 'payment',
        })

        res.json({success: true, session_url: session.url})
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true})
        } else { // payment failed -> delete the order
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
         console.log(error)
        return res.json({ success: false, message: error.message })
    }
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
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: 'status updated'})
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export { placeOrderCOD, placeOrderRazorpay, placeOrderStripe, verifyStripe, AllOrders, userOrders, updateStatus }