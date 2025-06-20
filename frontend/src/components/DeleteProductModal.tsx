import React from "react";
import { X, Trash, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteProduct } from "@/hooks/productHooks";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}

const DeleteProductModal = ({
  isOpen,
  onClose,
  productName,
  productId,
}: DeleteProductModalProps) => {

  const { mutate, isPending } = useDeleteProduct();

  const handleDelete = () => {
    mutate(productId, {
      onSuccess: () => {
        toast.success("Product deleted successfully.");
        onClose();
      },
      onError: () => {
        toast.error("Failed to delete product. Please try again.");
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-[#7D8184] opacity-50" onClick={onClose} />
      <div className="relative bg-background-primary rounded-lg px-5 py-7 min-h-[350px] w-[430px] border border-border-primary">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-danger-secondary rounded-full">
              <AlertTriangle className="w-10 h-10 text-danger-primary p-1" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Delete Product</h2>
          <p className="text-base text-text-secondary mb-3">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <p className="text-[20px] font-medium text-text-primary">{productName}</p>
        </div>

        <div className="flex gap-y-2 gap-x-5 justify-center">
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-sm border border-border-primary text-text-primary hover:cursor-pointer transition-colors min-w-28.5 min-h-10"
            disabled={isPending}
          >
            <X className="w-6 h-6" />
            <span className="font-medium">Cancel</span>
          </button>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-danger-primary text-white hover:cursor-pointer transition-colors min-w-28.5 min-h-10 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Trash className="w-6 h-6" />
            <span className="font-medium">{isPending ? "Deleting..." : "Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
