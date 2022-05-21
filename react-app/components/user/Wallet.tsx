import * as React from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Wallet = ():JSX.Element => {
  const { address, network, kit, connect, destroy } = useContractKit();
  const [balance, setBalance] = useState<string>('');

  const fetchBalance = useCallback(async () => {
    const { cUSD } = await kit.getTotalBalance(address);
    const roundingBalance = parseFloat(kit.web3.utils.fromWei(cUSD.toString(), 'ether')).toFixed(2);
    setBalance(roundingBalance);

    // upsert user data
    let user = await axios.post("/api/prisma/upsertUser", {
      address: address,
      balance: parseFloat(roundingBalance)
    })

    console.log(JSON.stringify(user));

  }, [address, kit]);

  useEffect(() => {
    if (address) {
      fetchBalance().catch(e => console.error(e));
    }
  }, [network, address, fetchBalance])

  return !address ? (
      <button type="button"
              className="btn btn-outline-primary"
              style={{ alignItems: "center"}}
              onClick={() => connect().catch(e => console.log(e))}>
        <i className="bi bi-wallet" style={{marginRight: "0.3rem"}}></i> Connect
      </button>
    ) :
    (
      <button type="button"
              className="btn btn-outline-primary"
              style={{display: "flex", alignItems: "center"}}>
        <i className="bi bi-x-circle" onClick={destroy} style={{marginRight: "0.5rem"}}></i>
        <span id="balance" >{balance}</span>cUSD
      </button>
    )
}

export default Wallet;