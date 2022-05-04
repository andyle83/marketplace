import * as React from "react";
import { Tabs, Tab, Typography, Box } from "@mui/material";
// import deployedContracts from "@celo-progressive-dapp-starter/hardhat/deployments/hardhat_contracts.json";
import { useContractKit } from "@celo-tools/use-contractkit";
import { StorageContract, GreeterContract, AccountInfo, Polling } from "@/components";
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

  // const contracts =
  //   deployedContracts[network?.chainId?.toString()]?.[
  //     network?.name?.toLocaleLowerCase()
  //   ]?.contracts;

  return (
    <AppLayout title="Celo Starter" description="Celo Starter">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Account" {...a11yProps(0)} />
            <Tab label="Storage" {...a11yProps(1)} />
            <Tab label="Greeter" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AccountInfo></AccountInfo>
        </TabPanel>
        {/*<TabPanel value={value} index={1}>*/}
        {/*  <StorageContract contractData={contracts?.Storage} />*/}
        {/*</TabPanel>*/}
        {/*<TabPanel value={value} index={2}>*/}
        {/*  <GreeterContract contractData={contracts?.Greeter} />*/}
        {/*</TabPanel>*/}
      </Box>
      <Polling/>
    </AppLayout>
  );
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
