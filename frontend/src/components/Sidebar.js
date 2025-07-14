"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart2, Heart, UserRound, ShoppingCart, LogOut } from "lucide-react";

export default function Sidebar() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const handleNavClick = (href) => {
    setVisible(false);     
    router.push(href);         
  };

  const handleLogout = () => {
    setVisible(false);
    router.push("/");          
  };

  if (!visible) return null;   

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Product Story
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-700"
          onClick={() => handleNavClick("/cart")}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          My Cart
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-700"
          onClick={() => handleNavClick("/wishlist")}
        >
          <Heart className="mr-2 h-5 w-5" />
          My Wishlist
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-700"
          onClick={() => handleNavClick("/dashboard/analytics")}
        >
          <BarChart2 className="mr-2 h-5 w-5" />
          Analytics
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-700"
          onClick={() => handleNavClick("/profile")}
        >
          <UserRound className="mr-2 h-5 w-5" />
          My Profile
        </Button>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-700 text-red-400"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
