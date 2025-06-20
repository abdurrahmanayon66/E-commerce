"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchProducts } from "@/hooks/productHooks";
import { useAddToWishlist } from "@/hooks/wishlistHooks";
import { toast } from "react-hot-toast";
import WishListModal from "@/components/WishListModal";
import {
  Search,
  Heart,
  ShoppingCart,
  Loader2,
  PlusIcon,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";

const SearchBar: React.FC<{}> = ({}) => {
  const { userType } = useUserStore();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [keyword, setKeyword] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, refetch } = useSearchProducts(category, keyword);

  const { mutate: addToWishlist, isPending: wishlistLoading } =
    useAddToWishlist();

  const handleSearchClick = () => {
    if (keyword.trim()) {
      setSearchTriggered(true);
      refetch();
    }
  };

  const handleAddWishlistClick = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleModalSelect = (wishlistId: string) => {
    if (!selectedProductId) return;
    addToWishlist(
      { wishlistId, productId: selectedProductId },
      {
        onSuccess: () => {
          toast.success("Added to wishlist", { position: "top-center" });
          setShowModal(false);
          setSelectedProductId(null);
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Could not add to wishlist";
          toast.error(msg, { position: "top-center" });
        },
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchTriggered(false);
      }
    };

    if (searchTriggered) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTriggered]);

  return (
    <div className="w-full border-t border-b border-border-primary px-4 md:px-8 lg:px-18 py-5">
      <div className="container h-full flex flex-col">
        <div className="w-full relative flex items-center gap-x-5">
          <div className="flex-1 relative flex items-center border border-text-secondary rounded-lg">
            <Select onValueChange={setCategory}>
              <SelectTrigger className="w-[145px] hidden md:flex min-h-13 space-x-2.5 [&>svg]:w-6 [&>svg]:h-6 text-text-secondary border-0 rounded-none rounded-l-lg text-base focus:ring-0 focus:ring-offset-0 [&[data-state=open]>svg]:rotate-180">
                <SelectValue
                  placeholder="Categories"
                  className="text-base text-text-secondary"
                />
              </SelectTrigger>
              <SelectContent className="z-[100] text-base text-text-secondary bg-white border-text-secondary">
                <SelectItem
                  value="electronics"
                  className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
                >
                  Electronics
                </SelectItem>
                <SelectItem
                  value="clothing"
                  className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
                >
                  Clothing
                </SelectItem>
                <SelectItem
                  value="books"
                  className="text-base hover:bg-background-hover hover:text-text-primary cursor-pointer"
                >
                  Books
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="h-8 w-px bg-border-primary" />

            <div className="flex-1 flex items-center min-h-13">
              <Search className="h-6 w-6 text-text-secondary ml-3 hidden md:block" />
              <Input
                type="text"
                placeholder="Search by product, brand, or keyword"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none rounded-r-lg text-base"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
              />
            </div>
          </div>

          <button
            className={`lg:h-12 h-10.5 absolute ${
              userType === "seller"
                ? "right-2"
                : userType === "customer"
                ? "right-30"
                : ""
            } lg:static min-w-10.5 lg:min-w-29 lg:px-4 lg:py-2 font-medium bg-button-primary text-white rounded-sm hover:bg-opacity-90 transition-colors text-base flex items-center justify-center gap-2`}
            onClick={handleSearchClick}
            disabled={isLoading}
          >
            <span className="lg:hidden">
              {isLoading ? (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              ) : (
                <Search className="h-6 w-6" />
              )}
            </span>

            <span className="hidden lg:flex items-center gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Search
                </>
              )}
            </span>
          </button>

          {userType === "customer" && (
            <div className="flex gap-x-2.5">
              <Link className="text-decoration: none" href="/customer/wishlist">
                <div className="flex items-center px-2 lg:px-4 py-2 justify-center gap-x-2.5 text-base text-text-secondary hover:cursor-pointer">
                  <Heart className="w-6 h-6" />
                  <span className="hidden lg:block">Wishlist</span>
                </div>
              </Link>
              <Link className="text-decoration: none" href="/shopping-cart">
                <div className="flex items-center px-2 lg:px-4 py-2 gap-x-2.5 justify-center text-base text-text-secondary hover:cursor-pointer">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="hidden lg:block">Cart</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {searchTriggered && data?.products && data.products.length > 0 && (
          <div
            ref={dropdownRef}
            className="mt-6 space-y-6 max-h-[500px] overflow-y-scroll border border-border-secondary rounded-lg p-5 z-20 top-40 bg-white w-full max-w-sm md:max-w-xl lg:max-w-5xl absolute"
          >
            {data.products.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img
                      src={`data:image/jpeg;base64,${item?.image}`}
                      alt={item?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="w-full flex gap-x-2.5 justify-between items-center">
                    <h3 className="text-xl font-medium text-text-primary">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-base mb-2.5">
                    {item?.model || item?.colour || ""}
                  </p>
                  <div className="flex justify-between gap-x-2.5 w-full items-center">
                    <p className="text-xl font-medium text-text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                    <div>
                      {userType !== "seller" && (
                        <button
                          onClick={(e) => handleAddWishlistClick(item._id, e)}
                          disabled={wishlistLoading}
                          className="flex items-center md:min-h-12 justify-center gap-x-2.5 px-2 md:px-4 py-1 md:py-2 text-white font-medium text-base rounded-sm bg-button-primary hover:cursor-pointer"
                        >
                          <PlusIcon className="w-6 h-6" />
                          <span className="text-sm font-medium hidden md:block">
                            {wishlistLoading ? "Adding..." : "Add to Wishlist"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchTriggered && data?.products && data.products.length === 0 && (
          <p className="text-text-secondary text-center py-4 mt-6">
            No products found
          </p>
        )}
      </div>

      <WishListModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleModalSelect}
      />
    </div>
  );
};

export default SearchBar;
