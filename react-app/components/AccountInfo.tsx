import * as React from "react";
import { Divider, Grid, Typography, Link, CircularProgress } from "@mui/material";

import { useContractKit } from "@celo-tools/use-contractkit";
import { useEffect, useState } from "react";
import { truncateAddress } from "@/utils";

import redstone from "redstone-api"

import AccountTable  from './AccountTable';

async function getPrices() {
  return {
    CELO: await redstone.getPrice("CELO"),
    EUR: await redstone.getPrice("EUR"),
    ETH: await redstone.getPrice("ETH")
  };
}

export function AccountInfo() {
  const { kit, address, network } = useContractKit();
  const [ loadingBalance, setLoadingBalance ] = useState(true);
  const baseCurrency = "cUSD";
  const [balance, setBalance] = useState({
    CELO: {
      raw: '0', base: 0, exchange: 1
    },
    cEUR: {
      raw: '0', base: 0, exchange: 1
    },
    cUSD: {
      raw: '0', base: 0, exchange: 1
    },
    cREAL: {
      raw: '0'
    }
  });

  async function fetchBalance() {
    const { CELO, cUSD, cEUR, cREAL } = await kit.getTotalBalance(address);
    const celoAmount = kit.web3.utils.fromWei(CELO.toString(), 'ether');
    const ceurAmount = kit.web3.utils.fromWei(cEUR.toString(), 'ether');
    const cusdAmount = kit.web3.utils.fromWei(cUSD.toString(), 'ether');
    const { CELO: celoUsdPrice, EUR: eurUsdPrice, ETH: ethUsdPrice } = await getPrices();

    setBalance({
      CELO: {
        raw: kit.web3.utils.fromWei(CELO.toString(), 'ether'),
        base: (celoUsdPrice.value * (+celoAmount)),
        exchange: celoUsdPrice.value
      },
      cEUR: {
        raw: kit.web3.utils.fromWei(cEUR.toString(), 'ether'),
        base: (eurUsdPrice.value * (+ceurAmount)),
        exchange: eurUsdPrice.value
      },
      cUSD: {
        raw: kit.web3.utils.fromWei(cUSD.toString(), 'ether'),
        base: (+cusdAmount),
        exchange: 1
      },
      cREAL: {
        raw: kit.web3.utils.fromWei(cREAL.toString(), 'ether'),
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

  const addressLink = `${network.explorer}/address/${address}`

  return (
    <Grid sx={{ m: 1 }} container justifyContent="center">
      <Grid item sm={6} xs={12} sx={{ m: 2 }}>
        <Typography variant="h5">Account Info: </Typography>
        {address && (
          <Link href={addressLink} target="_blank">
            {truncateAddress(address)}
          </Link>
        )}
        <Divider sx={{ m: 1 }} />
        <Typography variant="h6">Balance:</Typography>
        <Typography sx={{ m: 1, marginLeft: 0, wordWrap: "break-word" }}>
          { loadingBalance ? <CircularProgress /> : (
              <AccountTable
                  rows={[
                      { token: "CELO", balance: +balance.CELO.raw, value: +balance.CELO.base, exchange: balance.CELO.exchange, baseCurrency },
                      { token: "USD", balance: +balance.cUSD.raw, value: +balance.cUSD.base, exchange: balance.cUSD.exchange, baseCurrency },
                      { token: "EUR", balance: +balance.cEUR.raw, value: +balance.cEUR.base, exchange: balance.cEUR.exchange, baseCurrency }
                  ]}
              />
          )}
        </Typography>
      </Grid>
    </Grid>
  );
}
