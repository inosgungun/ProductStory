"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header({ onToggleSidebar }) {
  const Router = useRouter();
  return (
    <header className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b">
      <div className="flex items-center space-x-2">
        <button onClick={onToggleSidebar} className="text-white hover:text-gray-400">
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-semibold text-lg text-white">Product Story</span>
      </div>
      <Image
        src="/images/user.png" 
        onClick={() => Router.push("/profile")}
        alt="User"
        width={32}
        height={32}
        className="rounded-full"
      />
    </header>
  );
}
