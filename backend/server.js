import express from 'express'
import cors from 'cors'
import 'dotenv/config' // create a new file "named dotenv like .evn"
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

// App Config
const app = express() // used express package to create an instance of express server
const port = process.env.PORT || 4000 // if port number is available in .env then it will be used otherwise default 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json()) // whatever request we made that will be parsed with json
app.use(cors()) // to access backend from any IP

// API endpoints
app.use('/api/user', userRouter)
app.use('api/product', productRouter)

app.get('/', (req, res) => { // when a request is made on localhost:port like localhost:4000/ you will see this -> hit this end point and it will be executed as a get request
    res.send("API Working")
})

// start express server
app.listen(port, () => console.log('Server started on PORT: ' + port))
