import * as React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import AppLayout from "@/components/layout/AppLayout";

export default function App() {
  const { network } = useContractKit();

  return (
    <AppLayout title="Marketplace" description="A commune marketplace">
      This is where i have to get products
    </AppLayout>
  );
}