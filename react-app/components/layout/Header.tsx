import * as React from "react";
import { useState, useEffect } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";
// import { truncateAddress } from "@/utils";

export function Header() {
  const { address, network, kit } = useContractKit();
  const [balance, setBalance] = useState("");

  async function fetchBalance() {
    const { cUSD } = await kit.getTotalBalance(address);
    setBalance(kit.web3.utils.fromWei(cUSD.toString(), 'ether'))
  }

  useEffect(() => {
    if (address) {
      fetchBalance().then(_ => console.log("fet balance successfully"))
    }
  }, [network, address])

  return (
    <header>
      <nav className="navbar bg-white navbar-light border-bottom">
        <div className="container-fluid">
          <a className="navbar-brand m-0 h4 fw-bold" href="#">Marketplace</a>
          <span className="nav-link border rounded-pill bg-warning text-dark">
            <span id="balance">{balance}</span>cUSD
          </span>
        </div>
      </nav>
      <div className="alert alert-warning sticky-top mt-2" role="alert">
        <span id="notification">⌛ Loading...</span>
      </div>
      <div className="mb-4" style={{marginTop: "4em"}}>
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
