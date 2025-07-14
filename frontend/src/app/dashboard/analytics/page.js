"use client";

import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function AnalyticsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(console.error);
  }, []);

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  const ratingData = products.map(p => ({ name: p.title, rating: p.rating }));

  const priceRanges = [
    { range: "< $20", min: 0, max: 19.99 },
    { range: "$20 - $50", min: 20, max: 50 },
    { range: "$50 - $100", min: 50.01, max: 100 },
    { range: "$100+", min: 100.01, max: Infinity }
  ];

  const priceRangeData = priceRanges.map(r => ({
    name: r.range,
    count: products.filter(p => p.price >= r.min && p.price <= r.max).length
  }));

  return (
    <div className="p-8 bg-gray-800 min-h-screen">
      <div className="text-3xl font-bold mb-6 text-center text-white">Analytics</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-xl font-semibold mb-4 text-center">Products by Category</div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-xl font-semibold mb-4 text-center">Ratings by Product</div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={ratingData.slice(0, 10)} 
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end"/>
              <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]}/>
              <Tooltip />
              <Bar dataKey="rating" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-xl font-semibold mb-4 text-center">Products by Price Range</div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={priceRangeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const COLORS = ['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#22C55E'];
