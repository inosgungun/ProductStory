"use client";
import AuthCard from "@/components/AuthCard";

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Story</h1>
          <p className="text-lg text-gray-700">
            Discover and manage products with beautiful insights.
          </p>
        </div>
      </div>
      <div className="flex-1 bg-gray-800 flex items-center justify-center p-8">
        <AuthCard />
      </div>
    </div>
  );
}
