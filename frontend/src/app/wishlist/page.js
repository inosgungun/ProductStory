"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-md w-full max-w-3xl p-6 space-y-6">

        <h1 className="text-2xl font-semibold text-center">❤️ My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is empty</p>
        ) : (
          <div className="space-y-4">
            {wishlistItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-contain rounded bg-white" 
                  />
                  <p className="font-medium text-gray-800">{item.name}</p>
                </div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-row md:flex-row gap-3 pt-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            🛍 Continue Shopping
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
          >
            🛒 Go to Cart
          </button>
        </div>

      </div>
    </div>
  );
}
