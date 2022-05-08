import * as React from "react";
import { useState } from "react";
import { isMobile } from 'react-device-detect';
import { IoAdd } from "react-icons/io5";
import Dialog from "../product/dialog/";
import Wallet from "../user/Wallet";
import Notification from "./Notification";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";

export function Header() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
          { isMobile ? (
            <div className="d-flex flex-grow-1">
              <div className="w-100 text-right">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <a className="navbar-brand-two" href="#">
                <Image src="/banner.png" width="600" height="140"/>
              </a>
              <span className="w-100 d-lg-none d-block"/>
            </div>
          ) : (
            <div className="d-flex flex-grow-1">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              <a className="navbar-brand-two" href="#">
                <Image src="/banner.png" width="300" height="80" />
              </a>
            </div>
          )
          }
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
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
                      <button className="btn btn-secondary" type="button">
                        <BsSearch />
                      </button>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
          </div>
      </nav>
      <Notification />
      <div className="btn-toolbar justify-content-between tw-mt-4 tw-mb-4" role="toolbar"
           aria-label="Toolbar with button groups">
        <button
          className="btn btn-outline-danger btn-sm"
          style={{display: "flex", alignItems: "center"}}
          onClick={() => setOpenModal(true)}
        >
          <IoAdd /> Add product
        </button>
        <Dialog openModal={openModal} onClose={() => setOpenModal(false)} />
        <Wallet />
      </div>
    </header>
  );
}
