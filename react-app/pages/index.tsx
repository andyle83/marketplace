import * as React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import AppLayout from "@/components/layout/AppLayout";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function App() {
  const { network } = useContractKit();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppLayout title="Marketplace" description="A commune marketplace">
    </AppLayout>
  );
}