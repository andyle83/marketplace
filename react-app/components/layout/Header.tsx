import * as React from "react";
import { useState, useEffect } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
import { BsWalletFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {red} from "@mui/material/colors";

export function Header() {
  const { address, network, kit, connect, destroy } = useContractKit();
  const [balance, setBalance] = useState("");

  async function fetchBalance() {
    const { cUSD } = await kit.getTotalBalance(address);
    setBalance(kit.web3.utils.fromWei(cUSD.toString(), 'ether'))
  }

  useEffect(() => {
    if (address) {
      fetchBalance().then(_ => console.log("fetching balance"));
    }
  }, [network, address])

  return (
    <header>
      <nav className="navbar bg-white navbar-light border-bottom">
        <div className="container-fluid">
          <a className="navbar-brand m-0 h4 fw-bold" href="/">Marketplace</a>
          <span className="nav-link">
          {!address ? (
              <button type="button" className="btn btn-dark" style={{display: "flex", alignItems: "center"}}
                onClick={() => connect().catch(e => console.log(e))}
              >
                Connect wallet <BsWalletFill style={{marginLeft: "0.5rem"}} />
              </button>
            ) :
            (<>
              <button type="button" className="btn btn-dark" style={{display: "flex", alignItems: "center"}}>
                <span id="balance" className="m-1">{balance}</span>cUSD
                <IoIosCloseCircleOutline size={20} color="yellow" onClick={destroy}  style={{marginLeft: "0.5rem"}}/>
              </button>
            </>)
          }
          </span>
        </div>
      </nav>
      <div className="alert alert-warning sticky-top mt-2" role="alert">
        <span id="notification">⌛ Loading...</span>
      </div>
      <div className="mb-4" style={{marginTop: "1em"}}>
        <a
          className="btn btn-dark rounded-pill"
          data-bs-toggle="modal"
          data-bs-target="#addModal"
        >
          Add product
        </a>
      </div>
    </header>
  );
}
