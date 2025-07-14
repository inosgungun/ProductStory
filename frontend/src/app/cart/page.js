"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.email) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        console.log("Fetched cart:", data);
        if (data.success && Array.isArray(data.cart)) {
          setCartItems(data.cart);
        } else {
          toast.error("Failed to load cart");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching cart");
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, productId, quantity: newQuantity })
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.cart)) {
        setCartItems(data.cart);
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating cart");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + ((item.price * (item.discountPercentage || 0) / 100) * item.quantity),
    0
  );
  const payAmount = totalPrice - totalDiscount;

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl p-6 space-y-6">

        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center text-gray-700 hover:text-blue-600"
          >
            <ArrowLeft className="w-6 h-6 mr-1" />
          </button>
          <h1 className="text-2xl font-semibold text-center">🛒 My Cart</h1>
          <div className="w-8" />
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => {
              const discountedPrice = Math.round(item.price - (item.price * (item.discountPercentage || 0) / 100));
              return (
                <div key={`${item.productId}-${index}`} className="flex items-center gap-4 bg-white rounded-lg shadow p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain flex-shrink-0 bg-gray-100 rounded"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-green-600 font-semibold">₹ {discountedPrice}</p>
                      <p className="text-gray-500 line-through text-sm">₹ {item.price}</p>
                      <p className="text-green-600 text-xs">{item.discountPercentage || 0}% OFF</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                      >-</button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                      >+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="space-y-2 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between text-sm">
              <span>Total MRP</span>
              <span>₹ {totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="text-green-600">- ₹ {Math.round(totalDiscount)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹ {Math.round(payAmount)}</span>
            </div>
          </div>
        )}

        {cartItems.length > 0 && (
          <button
            onClick={() => toast("Proceeding to checkout!")}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 font-medium"
          >
            ✅ Checkout Securely
          </button>
        )}
      </div>
    </div>
  );
}
