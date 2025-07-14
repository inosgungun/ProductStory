"use client";

import { useState, useEffect } from "react";
import ProductsTab from "@/components/ProductsTab";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar for all screens */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <Sidebar onLinkClick={() => setSidebarOpen(false)} />
      </div>

      {/* Content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}
      >
        <Header onToggleSidebar={toggleSidebar} />

        <main className="flex-1 p-6 md:p-10 space-y-8">
          <div className="bg-gradient-to-r from-gray-700 via-purple-700 to-gray-700 text-white rounded-xl shadow-lg p-6 flex items-center gap-4">
            <Sparkles className="w-10 h-10" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome to Product Story!</h1>
              <p className="text-sm md:text-base text-white/90">
                Manage, analyze, and explore your products seamlessly with beautiful insights.
              </p>
            </div>
          </div>

          <section className="bg-white rounded-xl shadow p-8">
            <ProductsTab products={products} />
          </section>
        </main>
      </div>
    </div>
  );
}
