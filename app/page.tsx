import ProductListClient from "@/components/ProductListClient";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            X Store
          </h1>
          <AnimatedThemeToggler className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer" />
        </div>
        <ProductListClient />
      </div>
    </main>
  );
}
