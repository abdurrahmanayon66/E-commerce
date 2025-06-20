"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Box,
  CreditCard,
  ShoppingCart,
  Settings,
  Heart,
  UserRound,
  HelpCircle,
  Truck,
  X,
  LogOut,
} from "lucide-react";
import { useUserStore } from "@/store/userStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  trigger: React.ReactNode;
}

const MobileSidebar = ({ isOpen, setIsOpen, trigger }: MobileSidebarProps) => {
  const pathname = usePathname();
  const { userType } = useUserStore();
  const router = useRouter();
  const { resetUser } = useUserStore.getState();

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      resetUser();
      await fetch("/api/session/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/auth");
    }
  };

  const sellerNavItems = [
    { name: "Overview", href: "/seller/overview", icon: Home },
    { name: "Products", href: "/seller/products", icon: Box },
    { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
    { name: "Payments", href: "/seller/payments", icon: CreditCard },
    { name: "Settings", href: "/seller/settings", icon: Settings },
  ];

  const customerNavItems = [
    { name: "Overview", href: "/customer/overview", icon: Home },
    { name: "My Orders", href: "/customer/my-orders", icon: Truck },
    { name: "Wishlist", href: "/customer/wishlist", icon: Heart },
    { name: "Profile", href: "/customer/profile", icon: UserRound },
    { name: "Support", href: "/customer/support", icon: HelpCircle },
    { name: "Settings", href: "/customer/settings", icon: Settings },
  ];

  const navItems = userType === "seller" ? sellerNavItems : customerNavItems;

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 p-0 bg-white border-r border-border-primary"
      >
        <SheetHeader className="p-4 border-b border-border-primary">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[24px] font-bold text-text-tertiary">
              Logo
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="p-4 flex-1">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/seller/products" &&
                  [
                    "/seller/products",
                    "/seller/add-product",
                    "/seller/edit-product",
                  ].some((p) => pathname.startsWith(p))) ||
                (item.href === "/seller/orders" &&
                  ["/seller/orders", "/seller/view-order"].some((p) =>
                    pathname.startsWith(p)
                  ));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-4 py-4 rounded-md transition-colors ${
                    isActive
                      ? "bg-danger-secondary text-danger-primary font-medium"
                      : "text-text-secondary hover:bg-background-secondary font-normal"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-base">{item.name}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-4 rounded-md text-left text-text-secondary hover:bg-background-secondary transition-colors"
            >
              <LogOut className="h-6 w-6" />
              <span className="text-base">Logout</span>
            </button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
