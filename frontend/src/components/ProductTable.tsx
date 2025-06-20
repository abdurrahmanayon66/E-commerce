"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteProductModal from "./DeleteProductModal";
import { SimplifiedProduct } from "@/types/productTypes";
import Image from "next/image";

interface ProductTableProps {
  products: SimplifiedProduct[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SimplifiedProduct | null>(null);
  const router = useRouter();

  const handleDeleteClick = (product: SimplifiedProduct) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (productId: string) => {
    router.push(`/seller/edit-product/${productId}`);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-secondary text-success-primary";
      case "low stock":
        return "bg-warning-secondary text-warning-primary";
      case "out of stock":
        return "bg-danger-secondary text-danger-primary";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="block md:hidden space-y-4">
        {products.length === 0 ? (
          <div className="text-center py-6 text-text-secondary text-base">
            No products found.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border border-border-primary rounded-lg bg-white p-4"
            >
              <div className="flex items-start gap-3 mb-4">
                <Image
                  width={60}
                  height={60}
                  src={
                    product?.image && product?.image !== "null"
                      ? `data:image/jpeg;base64,${product?.image}`
                      : "https://example.com/default-image.jpg"
                  }
                  alt={product?.title}
                  className="w-15 h-15 object-cover rounded-sm"
                />
                <div className="flex-1">
                  <div className="text-base font-medium text-text-primary mb-1">
                    {product?.title}
                  </div>
                  <div className="text-base text-text-primary">
                    {product?.sku}
                  </div>
                </div>
              </div>
              
              <hr className="border-border-primary mb-4" />
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-text-secondary mb-1">Price</div>
                  <div className="text-base font-medium text-text-primary">
                    ${product?.price.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-text-secondary mb-1 text-center">Stock</div>
                  <div className="text-base font-medium text-text-primary text-center">
                    {product?.stock}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-text-secondary mb-1 pr-2.5">Status</div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium text-right ${getStatusStyles(
                      product.status
                    )}`}
                  >
                    {product.status
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </div>
              </div>

               <hr className="border-border-primary mb-4" />
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(product?._id)}
                  className="flex items-center justify-center flex-1 gap-x-2 px-4 py-3 rounded-md text-text-primary border border-border-primary text-base hover:bg-background-secondary"
                >
                  <Edit className="w-5 h-5" />
                  <span className="font-medium">Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="flex items-center justify-center flex-1 gap-x-2 px-4 py-3 rounded-md text-button-primary border border-danger-border text-base hover:bg-danger-secondary"
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="font-medium">Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block border border-border-primary rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-primary">
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
                Image
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
                Name
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
                SKU
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg hidden lg:table-cell">
                Price
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg hidden lg:table-cell">
                Stock
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
                Status
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-4 py-3 text-lg">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-text-secondary text-base"
                >
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product._id}
                  className="border-b last:border-b-0 border-border-primary"
                >
                  <TableCell className="px-4 py-4">
                    <Image
                      width={44}
                      height={44}
                      src={
                        product?.image && product?.image !== "null"
                          ? `data:image/jpeg;base64,${product?.image}`
                          : "https://example.com/default-image.jpg"
                      }
                      alt={product?.title}
                      className="w-11 h-11 object-cover rounded-sm"
                    />
                  </TableCell>
                  <TableCell className="text-text-primary px-4 py-4 text-base max-w-48 overflow-hidden">
                    {product?.title}
                  </TableCell>
                  <TableCell className="text-text-primary px-4 py-4 text-base">
                    {product?.sku}
                  </TableCell>
                  <TableCell className="text-text-primary px-4 py-4 text-base hidden lg:table-cell">
                    ${product?.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-text-primary px-4 py-4 text-base hidden lg:table-cell">
                    {product?.stock}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                        product.status
                      )}`}
                    >
                      {product.status
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex gap-2.5">
                      <button
                        onClick={() => handleEditClick(product?._id)}
                        className="flex items-center justify-center min-h-10 min-w-14 lg:min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-text-primary border border-border-primary text-base cursor-pointer"
                      >
                        <Edit className="w-5 h-5" />
                        <span className="font-medium  hidden lg:block">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="flex border border-danger-border justify-center items-center min-h-10 min-w-14 lg:min-w-25 gap-x-1.5 px-4 py-2 hover:cursor-pointer rounded-sm text-button-primary text-base cursor-pointer"
                      >
                        <Trash2 className="w-5 h-5" />
                        <span className="font-medium  hidden lg:block">Delete</span>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedProduct && (
        <DeleteProductModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          productName={selectedProduct.title}
          productId={selectedProduct._id}
        />
      )}
    </>
  );
};

export default ProductTable;