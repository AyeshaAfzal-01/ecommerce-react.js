import express from 'express'
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js'

// Create a new Express router instance
const userRouter = express.Router();

// Define routes for different user actions
userRouter.post('/register', registerUser)  // When POST request to /register, call registerUser
userRouter.post('/login', loginUser)        // When POST request to /login, call loginUser
userRouter.post('/admin', adminLogin)       // When POST request to /admin, call adminLogin

// Export router so it can be used in the main app
export default userRouter
//Routes file (userRouter.js) → Decides what URL should trigger which function.
//Controller file (userController.js) → Holds the actual code that runs when that route is accessed.

