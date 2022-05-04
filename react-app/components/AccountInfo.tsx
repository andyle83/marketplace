import * as React from "react";
import { Grid } from "@mui/material";

import { useContractKit } from "@celo-tools/use-contractkit";
import { useEffect, useState } from "react";

export function AccountInfo() {
  const { kit, address, network } = useContractKit();
  const [ loadingBalance, setLoadingBalance ] = useState(true);
  const baseCurrency = "cUSD";
  const [balance, setBalance] = useState({
    cUSD: {
      raw: '0', base: 0, exchange: 1
    }
  });

  async function fetchBalance() {
    const { cUSD } = await kit.getTotalBalance(address);
    const cusdAmount = kit.web3.utils.fromWei(cUSD.toString(), 'ether');

    setBalance({
      cUSD: {
        raw: kit.web3.utils.fromWei(cUSD.toString(), 'ether'),
        base: (+cusdAmount),
        exchange: 1
      }
    })
    setLoadingBalance(false)
  }

  useEffect(() => {
    if (address) {
      setLoadingBalance(true)
      fetchBalance()
    }
  }, [network, address, baseCurrency])

  return (
    <Grid sx={{ m: 1 }} container justifyContent="center">
      <Grid item sm={6} xs={12} sx={{ m: 2 }}>
        Your cUSD balance: {balance.cUSD.raw}
      </Grid>
    </Grid>
  );
}
