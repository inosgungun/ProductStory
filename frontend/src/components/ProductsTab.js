"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductsTab({ products }) {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/dashboard/products/${product.id}`}
            className="group block rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          >
       
            <div className="relative w-full bg-gray-100">
 
              <div className="relative h-64 sm:h-72 md:h-60 lg:h-64">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-800">
              <h3 className="text-lg font-semibold text-white truncate">{product.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{product.category}</p>

              <div className="flex justify-between items-center">
                <span className="text-white font-semibold">$ {product.price}</span>
                <span className="text-yellow-400 font-medium">⭐ {product.rating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <hr className="my-8 border-gray-300" />
    </div>
  );
}
