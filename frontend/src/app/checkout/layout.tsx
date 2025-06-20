import React from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background-primary flex flex-col overflow-hidden">
      <div>
        <Navbar />
        <SearchBar/>
      </div>
      <main className="bg-background-secondary px-4 md:px-8 lg:px-18 py-6">
        {children}
      </main>
    </div>
  );
};

export default CheckoutLayout;
