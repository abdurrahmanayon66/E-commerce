"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, HelpCircle, Bell, PanelLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useUserProfile } from "@/hooks/userHooks";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  const router = useRouter();
  const { userType } = useUserStore();
  const { resetUser } = useUserStore.getState();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { data, isLoading } = useUserProfile();

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

  const handleUserMenuChange = (value: string) => {
    if (value === "logout") {
      handleLogout();
    } else if (value === "profile") {
      router.push("/profile");
    }
  };

  return (
    <div className="w-full bg-white">
      <nav className="md:hidden block w-full py-6 px-4 lg:px-18">
        <div className="container w-full h-full flex items-center justify-between">
          <MobileSidebar
            isOpen={isMobileSidebarOpen}
            setIsOpen={setIsMobileSidebarOpen}
            trigger={
              <button>
                <PanelLeft className="w-6 h-6" />
              </button>
            }
          />
          <Link
            href={`/${userType}/overview`}
            className="text-[32px] font-bold text-text-tertiary"
          >
            Logo
          </Link>
          <div className="flex items-center gap-x-5">
            <Select onValueChange={handleUserMenuChange}>
              <SelectTrigger className="w-15 px-0 py-0 justify-start rounded-none border-0 focus:ring-0 focus:ring-offset-0 [&>svg]:ml-1.5 [&>svg]:w-5 [&>svg]:h-5 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full">
                    <Image
                      width={32}
                      height={32}
                      src={
                        data?.data?.image
                          ? `data:image/jpeg;base64,${data?.data?.image}`
                          : "https://github.com/shadcn.png"
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary">
                <SelectItem value="logout" className="text-base">
                  Logout
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>

      <nav className="hidden md:block w-full py-6 px-8 lg:px-18">
        <div className="container w-full h-full flex items-center justify-between">
          <Link
            href={`/${userType}/overview`}
            className="text-[32px] font-bold text-text-tertiary"
          >
            Logo
          </Link>
          <div className="flex items-center gap-x-5">
            <Select>
              <SelectTrigger className="space-x-2.5 w-30 border-0 px-4 py-2 focus:ring-0 text-text-secondary text-base focus:ring-offset-0 [&>svg]:w-6 [&>svg]:h-6 rounded-none rounded-l-md [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-x-2.5">
                  <Globe className="h-6 w-6 text-text-secondary" />
                  <SelectValue placeholder="EN" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en" className="text-text-primary text-base">
                  EN
                </SelectItem>
                <SelectItem value="es" className="text-text-primary text-base">
                  ES
                </SelectItem>
                <SelectItem value="fr" className="text-text-primary text-base">
                  FR
                </SelectItem>
                <SelectItem value="de" className="text-text-primary text-base">
                  DE
                </SelectItem>
              </SelectContent>
            </Select>

            <button className="flex gap-x-2.5 px-4 py-2">
              <HelpCircle className="h-6 w-6 text-text-secondary" />
              <span className="text-base text-text-secondary">Help</span>
            </button>

            <div className="relative">
              <button className="w-10 h-10 p-[1px] border border-border-primary rounded-md flex justify-center items-center">
                <Bell className="h-6 w-6 text-text-primary" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-button-primary font-medium rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            <Select onValueChange={handleUserMenuChange}>
              <SelectTrigger className="min-w-36.5 px-0 py-0 justify-start rounded-none border-0 focus:ring-0 focus:ring-offset-0 [&>svg]:ml-1.5 [&>svg]:w-5 [&>svg]:h-5 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full">
                    <Image
                      width={32}
                      height={32}
                      src={
                        data?.data?.image
                          ? `data:image/jpeg;base64,${data?.data?.image}`
                          : "https://github.com/shadcn.png"
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-base text-text-primary font-medium">
                    {data?.data?.name}
                  </p>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary">
                <SelectItem value="logout" className="text-base">
                  Logout
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
