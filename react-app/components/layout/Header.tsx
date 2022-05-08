import * as React from "react";
import { useState, useEffect } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

import { BsWalletFill } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Notification from "./Notification";
import { isMobile } from 'react-device-detect';
import { IoAdd } from "react-icons/io5";
import Dialog from "../product/dialog/";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

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
      <nav className="navbar navbar-expand-lg bg-white navbar-light border-bottom justify-content-between">
          <a className="navbar-brand" href="#">
            <Image src="/banner.png" width={isMobile ? "150" : "300" } height={isMobile ? "40" : "80" } />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Categories</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              <li className="nav-item">
                <form className="form-inline">
                  <div className="input-group">
                    <input type="text" className="form-control mr-sm-2" placeholder="Search for product" aria-label="Search" />
                      <div className="input-group-append">
                        <button className="btn btn-outline-danger" type="button">
                          <BsSearch />
                        </button>
                      </div>
                  </div>
                </form>
              </li>
            </ul>
          </div>
          {/*<span className="nav-link p-0">*/}
          {/*{!address ? (*/}
          {/*    <button type="button" className="btn btn-outline-danger" style={{display: "flex", alignItems: "center"}}*/}
          {/*      onClick={() => connect().catch(e => console.log(e))}*/}
          {/*    >*/}
          {/*      Wallet <BsWalletFill style={{marginLeft: "0.5rem"}} />*/}
          {/*    </button>*/}
          {/*  ) :*/}
          {/*  (<>*/}
          {/*    <button type="button" className="btn btn-outline-danger" style={{display: "flex", alignItems: "center"}}>*/}
          {/*      <span id="balance" className="m-1">{balance}</span>cUSD*/}
          {/*      <IoIosCloseCircleOutline*/}
          {/*        size={20}*/}
          {/*        onClick={destroy}*/}
          {/*        style={{marginLeft: "0.5rem"}}/>*/}
          {/*    </button>*/}
          {/*  </>)*/}
          {/*}*/}
          {/*</span>*/}
      </nav>
      <Notification />
      <div className="mb-4" style={{marginTop: "1em"}}>
        <button
          className="btn btn-outline-danger"
          style={{display: "flex", alignItems: "center"}}
          onClick={() => setOpenModal(true)}
        >
          <IoAdd /> Add product
        </button>
        <Dialog openModal={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </header>
  );
}
