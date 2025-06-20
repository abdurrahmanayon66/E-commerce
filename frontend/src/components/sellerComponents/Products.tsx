"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductTable from "../ProductTable";
import OrderProductSearchBar from "../OrderProductSearchBar";
import { useProducts } from "@/hooks/productHooks";
import { useProductFilterStore } from "@/store/productFilterStore";
import { SimplifiedProduct } from "@/types/productTypes";

const Products = () => {
  const router = useRouter();
  const { data, isLoading, error } = useProducts();
  const { search, category, stockStatus } = useProductFilterStore();
  const allProducts: SimplifiedProduct[] = data?.products || [];
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      !search.trim() ||
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.sku?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category || product.category?.toLowerCase() === category.toLowerCase();

    const matchesStock =
      !stockStatus || product.stockStatus === stockStatus;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const Header = (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold">Products</h1>
      <button
        onClick={() => router.push("/seller/add-product")}
        className="flex items-center min-w-[174px] min-h-[52px] gap-2.5 px-5 py-2.5 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors cursor-pointer"
        disabled={isLoading}
      >
        <Plus className="w-6 h-6" />
        Add Product
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Header}
        <OrderProductSearchBar type="product" />
        <div>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {Header}
        <OrderProductSearchBar type="product" />
        <div className="text-red-500">Error loading products</div>
      </div>
    );
  }

  return (
    <div className="lg:space-y-6 space-y-2.5">
      {Header}
      <OrderProductSearchBar type="product" />
      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default Products;
