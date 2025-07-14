import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import connectDB from "./lib/db.js";
import User from "./models/user.js";


dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  await transporter.sendMail({
    from: '"Product Story" <no-reply@productstory.com>',
    to: email,
    subject: "Verify your Email",
    html: `<div style="font-family:sans-serif;text-align:center;">
             <h2>Verify your email</h2>
             <p>We just need to verify your email address. Enter the following code below to complete the verification process:</p>
             <p style="font-size:24px;font-weight:bold;">${otp}</p>
             <p>The code will expire in 10 minutes.</p>
           </div>`,
  });

  res.send({ message: "OTP sent" });
});

app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] !== otp) {
    return res.status(400).send({ success: false, message: "Invalid OTP" });
  }

  try {
    delete otpStore[email]; 

    await transporter.sendMail({
      from: '"Product Story" <no-reply@productstory.com>',
      to: email,
      subject: "Login Successful",
      html: `<div style="font-family:sans-serif;text-align:center;">
               <h2>Welcome to Product Story!</h2>
               <p>Your login was successful.</p>
             </div>`
    });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: email.split("@")[0],
        email,
        contact: "",
        address: "",
        wishlist: [],
        cart: [],
        orderHistory: []
      });
    }

    res.send({ success: true, user }); 
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).send({ success: false, message: "Server error, try again" });
  }
});


app.post("/api/update-profile", async (req, res) => {
  const { email, name, contact, address } = req.body;

  if (!email) {
    return res.status(400).send({ success: false, message: "Email is required" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, contact, address },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

    res.send({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

app.get("/api/get-profile", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send({ success: false, message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.error("Fetch profile error:", err);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

app.post("/api/wishlist/check", async (req, res) => {
  const { email, productId } = req.body;
  if (!email || !productId) {
    return res.status(400).send({ success: false, message: "Missing email or productId" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });
    const inWishlist = user.wishlist.some(item => item.toString() === productId);
    res.send({ success: true, inWishlist });
  } catch (error) {
    console.error("Wishlist check error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

app.post("/api/wishlist/toggle", async (req, res) => {
  const { email, productId } = req.body;
  const productIdNumber = Number(productId);

  if (!email || !productId) {
    return res.status(400).send({ success: false, message: "Missing email or productId" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    const index = user.wishlist.findIndex(item => item === productIdNumber);
    let inWishlist;
    if (index > -1) {
      user.wishlist.splice(index, 1);
      inWishlist = false;
    } else {
      user.wishlist.push(productIdNumber);
      inWishlist = true;
    }
    await user.save();
    res.send({ success: true, inWishlist, wishlist: user.wishlist });
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

app.post("/api/cart/add", async (req, res) => {
  const { email, productId } = req.body;
  if (!email || !productId) {
    return res.status(400).send({ success: false, message: "Missing email or productId" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });
    
    const productIdNumber = Number(productId);
    if (isNaN(productIdNumber)) {
      return res.status(400).send({ success: false, message: "Invalid productId" });
    }
    
    const existingItem = user.cart.find(item => item.productId === productIdNumber);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId: productIdNumber, quantity: 1 });
    }

    await user.save();
    res.send({ success: true, cart: user.cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

app.get("/api/cart", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const productIds = user.cart.map(item => item.productId);
    const products = await Product.find({ id: { $in: productIds } }).lean();

    const cartWithDetails = user.cart.map(item => {
      const product = products.find(p => String(p.id) === String(item.productId));
      if (product) {
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: Number(product.price) || 0,
          discountPercentage: Number(product.discountPercentage) || 0,
          name: product.title || "Unnamed",
          image: product.thumbnail || ""
        };
      }
      return null;
    }).filter(Boolean);

    res.json({ success: true, cart: cartWithDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.post("/api/cart/update", async (req, res) => {
  const { email, productId, quantity } = req.body;
  if (!email || !productId) {
    return res.status(400).send({ success: false, message: "Missing data" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    const existing = user.cart.find(item => item.productId === productId);
    if (existing) {
      if (quantity <= 0) {
        user.cart = user.cart.filter(item => item.productId !== productId);
      } else {
        existing.quantity = quantity;
      }
    } else if (quantity > 0) {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    const productIds = user.cart.map(item => item.productId);
    const products = await Product.find({ id: { $in: productIds } });
    const cartWithDetails = user.cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
          discountPercentage: product.discountPercentage,
          name: product.title,
          image: product.thumbnail
        };
      } else {
        return null;
      }
    }).filter(Boolean);

    res.send({ success: true, cart: cartWithDetails });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});


app.get("/api/wishlist", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).send({ success: false, message: "Email is required" });
  }
  try {
    const user = await User.findOne({ email }).populate("wishlist");
    if (!user) return res.status(404).send({ success: false, message: "User not found" });
    res.send({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });