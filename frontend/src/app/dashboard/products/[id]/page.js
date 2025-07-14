import ProductCard from "@/components/ProductCard";
import { Image } from "lucide-react";

export default async function ProductPage({ params }) {

    const awaitedParams = await params;

    const { id } = awaitedParams; 
    const productId = parseInt(id);

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    const product = data.products.find(p => p.id === productId);

    if (!product) {
        return <div className="p-8">Product not found</div>;
    }

    return (
        <div className="p-8 bg-gray-800">
            <ProductCard product={product}/>
        </div>
    );
}
