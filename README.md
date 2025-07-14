# 🛍️ Product Story

> **Product Story** is a modern, full-stack **Dashboard Application** built to help users manage and track products effortlessly.  
> Built with **Next.js**, **Node.js**, **MongoDB**, **Tailwind CSS**, and **shadcn/ui**, it offers a clean, responsive, and user-friendly interface — inspired by real-world e-commerce and inventory systems.


## 📊 What is Product Story?

Product Story is more than just a product list: it’s a complete **dashboard** where you can:
- View, add, and track product details including **QR codes** and **barcodes**
- Check when products were **created** and **last updated**
- Add products to your **cart** or **wishlist**
- Securely **login with OTP-based authentication** instead of passwords
- Enjoy professional **email notifications** (e.g., verify email, login success)
- Experience a **responsive design** that works seamlessly on mobile, tablet, and desktop
- Dummy Data Link:  [https://dummyjson.com/products](https://dummyjson.com/products)

Whether you’re building a personal project, an internal tool, or the base of an e-commerce app — **Product Story** provides a polished, real-world-ready starting point.




## ✨ Key Features


- 🛡️ **OTP authentication**: secure and user-friendly login flow
- ❤️ **Wishlist button**: visually appealing heart toggle
- 🧾 **Product metadata**: created date, updated date, QR code, barcode
- 📧 **Transactional emails**: professional design with branding
- 📱 **Responsive & modern UI**: built with Tailwind CSS + shadcn/ui
- ⚡ **RESTful API**: built using Node.js & Express
- 🛢️ **MongoDB database**: scalable and flexible data storage


## ⚙️ Tech Stack

| Layer      | Technology                                    |
|-----------|-----------------------------------------------|
| Frontend  | Next.js, React, Tailwind CSS, shadcn/ui       |
| Backend   | Node.js, Express.js                           |
| Database  | MongoDB                                       |
| Icons     | Lucide React                                   |



## 🚀 Getting Started

### 📦 Clone the repository

```
git clone https://github.com/inosgungun/ProductStory.git
cd product-story
```




### ⚙️ Backend Setup

```
cd backend
npm install
```

###  🛠 Create `.env` file in the `backend` folder

>📧 **Tip:** Go to your Google account settings → App passwords → generate app password,  
write app name and copy the generated password below.
```
EMAIL_USER=<your email>
EMAIL_PASS=<setup password>
```
>Create a new MongoDB database and paste your URI here:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ekpha.mongodb.net/Product_Story
```

### ▶️ Run the backend server
```
node index.js
```


### 🌐 Frontend Setup

```
cd frontend
npm install
```

### 🛠 Create `.env.local` file in the `frontend` folder

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### ▶️ Run the frontend 
```
npm run dev
```

## ✉️ Contact

Created with ❤️ by [Gungun Soni](https://github.com/inosgungun).
