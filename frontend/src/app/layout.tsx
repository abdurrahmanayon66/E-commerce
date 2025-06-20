import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Multivendor E-Commerce Platform",
  description: "Discover and shop from a wide range of products offered by multiple sellers. Enjoy seamless shopping, secure payments, and fast delivery at ShopSphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
         <Providers>
           <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
