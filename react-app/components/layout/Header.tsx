import * as React from "react";
import Notification from "./Notification";
import Image from "next/image";
import Toolbar from "@/components/layout/Toolbar";

import { useCheckMobileScreen } from "@/utils";

// Clean code, but this component is not re-usable
const MobileHeader = (): JSX.Element => {
  return (
    <div className="d-flex flex-grow-1">
      <div className="w-100 text-right">
        <button className="navbar-toggler mt-3" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <a className="navbar-brand-two" href="#">
        <Image src="/banner.png" width="1000" height="300" alt="Marketplace" />
      </a>
      <span className="w-100 d-lg-none d-block"/>
    </div>
  )
}

// Clean code, but this component is not re-usable
const DesktopHeader = (): JSX.Element => {
  return (
    <div className="d-flex flex-grow-1">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand-two" href="/">
        <Image src="/banner.png" width="300" height="80" alt="Marketplace" />
      </a>
    </div>
  )
}

export function Header() {
  const isMobile = useCheckMobileScreen();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        {isMobile ? <MobileHeader/> : <DesktopHeader/>}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <ul className="navbar-nav font-monospace small">
            <li className="nav-item">
              <a className="nav-link md:tw-mr-5" href="/">HOME</a>
            </li>
            <li className="nav-item">
              <a className="nav-link md:tw-mr-5" href="/orders">ORDERS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link md:tw-mr-5" href="/categories">CATEGORIES</a>
            </li>
            <li className="nav-item">
              <a className="nav-link md:tw-mr-5" href="/business">BUSINESS</a>
            </li>
            <li className="nav-item md:tw-mr-5">
              <a className="nav-link" href="/about">ABOUT US</a>
            </li>
            <li className="nav-item">
              <form className="form-inline">
                <div className="input-group">
                  <input type="text" style={{borderRadius: 0}} className="form-control mr-sm-2" placeholder="Search for product" aria-label="Search" />
                  <div className="input-group-append">
                    <button className="btn btn-danger" type="button" style={{borderRadius: 0}}>
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </nav>
      <Notification />
      <Toolbar />
    </header>
  );
}
