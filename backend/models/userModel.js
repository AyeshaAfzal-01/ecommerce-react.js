import mongoose from "mongoose"

//schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // if an account is created with one email id and you're here to create another acount with the same email id then it is not going to work
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }, // mongoose ignore this cartdAta bcz of empty object _>to make it available in database we use minimize:false
}, {minimize:false})

// model
const userModel = mongoose.model.user || mongoose.model('user', userSchema);

export default userModel