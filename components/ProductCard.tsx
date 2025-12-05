import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

export type Product = {
  id: number;
  name: string;
  image_url: string;
  sizes: string[];
  qualities: string[];
};

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("fetch error");
    return r.json();
  });

export function ProductCard({ product }: { product: Product }) {
  const defaultSize = product.sizes[0] ?? "";
  const defaultQuality = product.qualities[0] ?? "";
  const [size, setSize] = useState(defaultSize);
  const [quality, setQuality] = useState(defaultQuality);

  const { data: priceData } = useSWR(
    size && quality
      ? `/api/products/${product.id}/price?size=${encodeURIComponent(
          size
        )}&quality=${encodeURIComponent(quality)}`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const price = priceData?.price ?? null;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-700 p-4 flex flex-col">
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        {/* use next/image for optimization; domain must be allowed in next.config.js */}
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="mt-4 flex-1 flex flex-col">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {product.name}
        </h2>

        <div className="mt-3 flex gap-3 items-center">
          <label className="flex flex-col text-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Size
            </span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
            >
              {product.sizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Quality
            </span>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="mt-1 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 cursor-pointer"
            >
              {product.qualities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {price === null ? "—" : `€${price}`}
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 cursor-pointer">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
