"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        const email = storedUser ? JSON.parse(storedUser).email : "";
        if (!email) {
          toast.error("No logged-in user found");
          setLoading(false);
          return;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-profile?email=${email}`);
        if (res.ok) {
          const data = await res.json();
          setUser({
            name: data.name || "",
            email: data.email || "",
            contact: data.contact || "",
            address: data.address || ""
          });
        } else {
          toast.error("Failed to load profile");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (field, value) => {
    if (!isEditing) return;
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSaveToggle = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        const { name, contact, address, email } = user;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, contact, address, email })
        });
        if (res.ok) {
          toast.success("Profile updated successfully!");
          setIsEditing(false);
        } else {
          toast.error("Failed to update profile");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error updating profile");
      } finally {
        setLoading(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-800">👤 My Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-xs sm:text-sm mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={e => handleChange("name", e.target.value)}
              readOnly={!isEditing}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:border-blue-400"}`}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs sm:text-sm mb-1">Email (not editable)</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs sm:text-sm mb-1">Contact</label>
            <input
              type="text"
              value={user.contact}
              onChange={e => handleChange("contact", e.target.value)}
              readOnly={!isEditing}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:border-blue-400"}`}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs sm:text-sm mb-1">Address</label>
            <textarea
              value={user.address}
              onChange={e => handleChange("address", e.target.value)}
              readOnly={!isEditing}
              rows={3}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none resize-none ${!isEditing ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:border-blue-400"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          <button
            onClick={() => router.push("/wishlist")}
            className="py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium"
          >
            ❤️ Wishlist
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            🛒 Cart
          </button>
          <button
            onClick={handleEditSaveToggle}
            disabled={loading}
            className="py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditing ? "💾 Save" : "✏️ Edit"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
