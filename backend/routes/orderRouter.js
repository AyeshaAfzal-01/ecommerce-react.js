import express from 'express'
import { placeOrderCOD, placeOrderRazorpay, placeOrderStripe, AllOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = new express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, AllOrders)
orderRouter.post('/status', adminAuth, updateStatus)
// payment features
orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
// user feature - frontend
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter