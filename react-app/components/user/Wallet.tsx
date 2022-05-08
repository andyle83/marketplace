import * as React from "react";
import {BsWalletFill} from "react-icons/bs";
import {IoIosCloseCircleOutline} from "react-icons/io";
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
      <button type="button" className="btn btn-outline-danger btn-sm" style={{display: "flex", alignItems: "center"}}
              onClick={() => connect().catch(e => console.log(e))}
      >
        Wallet <BsWalletFill style={{marginLeft: "0.5rem"}} />
      </button>
    ) :
    (
      <button type="button" className="btn btn-outline-danger btn-sm" style={{display: "flex", alignItems: "center"}}>
        <span id="balance" >{balance}</span>cUSD
        <IoIosCloseCircleOutline
          size={20}
          onClick={destroy}
          style={{marginLeft: "0.5rem"}}/>
      </button>
    )
}