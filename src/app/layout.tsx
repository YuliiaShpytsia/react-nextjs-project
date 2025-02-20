import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/MenuComponent/MenuComponent";


export const metadata: Metadata = {
  title: "Mini-project Next.js",
  description: "Test on Next.js knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Menu/>
        {children}
      </body>
    </html>
  );
}
