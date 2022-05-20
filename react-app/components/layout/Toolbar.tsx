import * as React from "react";
import Dialog from "@/components/product/Dialog";
import Wallet from "@/components/user/Wallet";
import {useState} from "react";
import {useContractKit} from "@celo-tools/use-contractkit";
import classNames from "classnames";

const Toolbar = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { address } = useContractKit();

  const btnClass = classNames('btn',
    {'btn-outline-primary': address},
    {'btn-secondary': !address},
    {disabled: !address});

  return (
    <div className="btn-toolbar justify-content-between tw-mt-4 tw-mb-4" role="toolbar"
         aria-label="Toolbar with button groups">
      <button
        className={btnClass}
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

export default Toolbar;
