import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contact: String,
  address: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orderHistory: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    orderDate: Date
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
