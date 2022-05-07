import * as React from "react";
import { useState, useEffect } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

import { BsWalletFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Notification from "./Notification";
import { isMobile } from 'react-device-detect';
import { IoAdd } from "react-icons/io5";
import Dialog from "../product/dialog/";

const classNames = require('classnames');

export function Header() {
  const { address, network, kit, connect, destroy } = useContractKit();
  const [balance, setBalance] = useState("");
  const [openModal, setOpenModal] = useState(false);

  async function fetchBalance() {
    const { cUSD } = await kit.getTotalBalance(address);
    setBalance(kit.web3.utils.fromWei(cUSD.toString(), 'ether'))
  }

  useEffect(() => {
    if (address) {
      fetchBalance().catch(e => console.error(e));
    }
  }, [network, address])

  const titleClass = classNames("navbar-brand font-monospace", {
    'fs-6': isMobile,
    'fs-3': !isMobile
  })

  return (
    <header>
      <nav className="navbar bg-white navbar-light border-bottom">
        <div className="container-fluid">
          <a className={titleClass} href="/">Food Marketplace</a>
          <span className="nav-link p-0">
          {!address ? (
              <button type="button" className="btn btn-dark" style={{display: "flex", alignItems: "center"}}
                onClick={() => connect().catch(e => console.log(e))}
              >
                Wallet <BsWalletFill style={{marginLeft: "0.5rem"}} color="yellow" />
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
      <Notification />
      <div className="mb-4" style={{marginTop: "1em"}}>
        <button
          className="btn btn-dark"
          style={{display: "flex", alignItems: "center"}}
          onClick={() => setOpenModal(true)}
        >
          <IoAdd color="yellow" /> Add product
        </button>
        <Dialog openModal={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </header>
  );
}
