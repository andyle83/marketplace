import * as React from "react";
import Footer from "./Footer";
import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="container mt-2" style={{ maxWidth: "72em"}}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
