"use client";
import Image from "next/image";
import { Star, HeartIcon, Tag, Package, Truck, RefreshCw, Ruler, Shield, Box, Info, Calendar, Barcode, ChevronRight, Check, ShoppingCart, Heart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";


export default function ProductPage({ product }) {
  const [inWishlist, setInWishlist] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          if (parsed?.email) setEmail(parsed.email);
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!email || !product.id) {
        console.warn("Missing email or product.id for wishlist check");
        return;
      }
      console.log("Checking wishlist with email:", email, "product.id:", product.id);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist/check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, productId: Number(product.id) })
        });
        const data = await res.json();
        console.log("Wishlist check response:", data);
        setInWishlist(data.inWishlist);
      } catch (error) {
        console.error("Failed to check wishlist", error);
      }
    };
    checkWishlist();
  }, [email, product.id]);



  const toggleWishlist = async () => {
    if (!email || !product.id) return toast.error("Missing user or product info");
    console.log("Toggling wishlist:", email, product.id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: Number(product.id) })
      });
      const data = await res.json();
      console.log("Toggle wishlist response:", data);
      setInWishlist(data.inWishlist);
      toast.success(data.inWishlist ? "Added to Wishlist" : "Removed from Wishlist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update wishlist");
    }
  };



  const addToCart = async () => {
    if (!email || !product.id) return toast.error("Missing user or product info");
    console.log("Adding to cart:", email, product.id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: Number(product.id) })
      });
      const data = await res.json();
      console.log("Add to cart response:", data);
      if (data.success) {
        toast.success("Added to cart!");
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };



  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          <div className="w-full md:w-1/2">
            <div className="sticky top-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border relative">
                <div className="relative aspect-square w-full mb-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="rounded-lg object-contain"
                    priority
                  />

                  <div className="absolute bottom-2 left-2 flex gap-1 bg-white/70 backdrop-blur-sm p-1 rounded-md overflow-x-auto max-w-[80%]">
                    {product.images.map((img, index) => (
                      <div key={index} className="flex-shrink-0 w-12 h-12 relative border rounded overflow-hidden">
                        <Image
                          src={img}
                          alt={`${product.title} ${index}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-sm border">

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-indigo-600">{product.brand}</span>
                    <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.title}</h1>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="text-green-600 font-medium">{product.stock}</span> in stock
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <span className="text-lg text-green-600 font-medium">
                        {product.discountPercentage}% OFF
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                  </div>
                </div>

                <div className="-mt-6 mb-4 flex-shrink-0">
                  <Image
                    src={product.meta.qrCode}
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="rounded border shadow"
                  />
                </div>
              </div>


              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                <ul className="space-y-2">
                  {product.description.split('. ').map((point, i) => (
                    point && (
                      <li key={i} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{point.trim()}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={addToCart} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`flex items-center justify-center p-3 rounded-lg transition-colors
    ${inWishlist ? "bg-red-50 text-red-500 " : "hover:bg-gray-100 border border-gray-600 text-gray-700"}`}
                >
                  {inWishlist ? (
                    <Heart fill="currentColor" className="w-5 h-5 text-red-500 border-b-red-500" />
                  ) : (
                    <Heart className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-medium">Free Shipping</p>
                    <p className="text-sm text-gray-500">{product.shippingInformation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-medium">Warranty</p>
                    <p className="text-sm text-gray-500">{product.warrantyInformation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-gray-500">{product.returnPolicy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">General</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex justify-between">
                      <span className="text-gray-500">Brand</span>
                      <span>{product.brand}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Category</span>
                      <span>{product.category}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">SKU</span>
                      <span>{product.sku}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Dimensions</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex justify-between">
                      <span className="text-gray-500">Width</span>
                      <span>{product.dimensions.width}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Height</span>
                      <span>{product.dimensions.height}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Depth</span>
                      <span>{product.dimensions.depth}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Weight</span>
                      <span>{product.weight}g</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Availability</h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span>{product.availabilityStatus}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-500">Min. Order</span>
                      <span>{product.minimumOrderQuantity}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Metadata</h3>
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-4 h-4" /> Created
                      </span>
                      <span>{new Date(product.meta.createdAt).toLocaleDateString()}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-gray-500">
                        <RefreshCw className="w-4 h-4" /> Updated
                      </span>
                      <span>{new Date(product.meta.updatedAt).toLocaleDateString()}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Barcode className="w-4 h-4 " /> Barcode
                      </span>
                      <span>{product.meta.barcode}</span>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b">Customer Reviews</h2>
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {product.reviews.map((review, index) => (
                <div key={index} className="pb-4 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm font-medium">{review.rating}</span>
                    </div>
                    <span className="font-medium">{review.reviewerName}</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}