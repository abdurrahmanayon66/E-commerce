"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { useUserStore } from "@/store/userStore";

const Sidebar = () => {
  const pathname = usePathname();
  const { userType } = useUserStore();

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

  return (
    <aside className="lg:w-84 pl-3 lg:pl-14 h-full bg-white relative z-[10] border-r border-border-primary flex flex-col">
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
                className={`flex items-center gap-3 px-4 py-4 rounded-md transition-colors ${
                  isActive
                    ? "lg:bg-danger-secondary text-danger-primary font-medium"
                    : "text-text-secondary hover:bg-background-secondary font-normal"
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-base hidden lg:block">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
