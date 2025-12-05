"use client";

import useSWR from "swr";
import { ProductCard, type Product } from "./ProductCard";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("fetch error");
    return r.json();
  });

export default function ProductListClient() {
  const { data: products, error } = useSWR<Product[]>(
    "/api/products",
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error)
    return (
      <div className="text-red-600 dark:text-red-400 text-center py-8">
        Failed to load products
      </div>
    );
  if (!products)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
          <div className="text-gray-500 dark:text-gray-400">
            Loading products…
          </div>
        </div>
      </div>
    );

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
