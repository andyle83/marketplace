import * as React from "react";
import Dialog from "@/components/product/Dialog";
import Wallet from "@/components/user/Wallet";
import {useState} from "react";

export default function Toolbar() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="btn-toolbar justify-content-between tw-mt-4 tw-mb-4" role="toolbar"
         aria-label="Toolbar with button groups">
      <button
        className="btn btn-outline-primary"
        style={{alignItems: "center"}}
        onClick={() => setOpenModal(true)}
      >
        <i className="bi bi-plus"></i> Add product
      </button>
      <Dialog openModal={openModal} onClose={() => setOpenModal(false)} />
      <Wallet />
    </div>
  )
}
