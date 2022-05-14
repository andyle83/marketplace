import * as React from "react";
import {useContractKit} from "@celo-tools/use-contractkit";
import {useEffect, useState} from "react";

export default function Wallet() {
  const { address, network, kit, connect, destroy } = useContractKit();
  const [balance, setBalance] = useState("");

  async function fetchBalance() {
    const { cUSD } = await kit.getTotalBalance(address);
    setBalance(kit.web3.utils.fromWei(cUSD.toString(), 'ether'))
  }

  useEffect(() => {
    if (address) {
      fetchBalance().catch(e => console.error(e));
    }
  }, [network, address])

  return !address ? (
      <button type="button" className="btn btn-outline-primary" style={{ alignItems: "center"}}
              onClick={() => connect().catch(e => console.log(e))}
      >
        <i className="bi bi-wallet" style={{marginRight: "0.3rem"}}></i> Connect
      </button>
    ) :
    (
      <button type="button" className="btn btn-outline-primary" style={{display: "flex", alignItems: "center"}}>
        <i className="bi bi-x-circle" onClick={destroy} style={{marginRight: "0.5rem"}}></i>
        <span id="balance" >{balance}</span>cUSD
      </button>
    )
}