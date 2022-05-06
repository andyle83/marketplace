import * as React from "react";
import Meta from "../meta/Meta";
import Footer from "./Footer";
import { Header } from "./Header";

interface AppLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AppLayout({ title, description, children }: AppLayoutProps) {
  return (
    <div className="container mt-2">
      <Header />
      <Meta title={title} description={description} />
      {children}
      <Footer />
    </div>
  );
}
