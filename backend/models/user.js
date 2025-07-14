import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contact: String,
  address: String,
  wishlist: [{ type: Number }],
  cart: [{ productId: { type: Number }, quantity: { type: Number, default: 1 } }],
  orderHistory: [{
    productId: Number,
    quantity: Number,
    orderDate: Date
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
