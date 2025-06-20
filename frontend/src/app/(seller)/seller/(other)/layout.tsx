import React from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-background-primary flex flex-col overflow-hidden">
      <div>
        <Navbar />
        <SearchBar />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 bg-background-secondary pt-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
