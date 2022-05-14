import * as React from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {useContractKit} from "@celo-tools/use-contractkit";
import {useState} from "react";
import BigNumber from "bignumber.js";
import {ERC20_DECIMALS} from "@/constants";

interface DialogProps {
  openModal: boolean,
  onClose: () => void,
}

export default function Dialog({ openModal, onClose }: DialogProps) {
  const { address, network, kit, connect, destroy } = useContractKit();
  const [productName, setProductName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setPrice(parseFloat(e.target.value));
  }

  return (
    <Modal
      open={openModal}
      onClose={onClose}
      showCloseIcon={false}
      center
      classNames={{
        overlay: 'customDialogOverlay',
        modal: 'customDialogModal'
    }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create a new product</h5>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="product-name" className="col-form-label">Name:</label>
              <input type="text" className="form-control" id="product-name" value={productName} onChange={e => setProductName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="product-image-url" className="col-form-label">Image URL:</label>
              <input type="text" className="form-control" id="product-image-url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="product-location" className="col-form-label">Location:</label>
              <input className="form-control" id="product-location" value={location} onChange={e => setLocation(e.target.value)}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="product-price" className="col-form-label">Price:</label>
              <input className="form-control" id="product-price" value={price} onChange={e => onPriceChange(e)}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="product-description" className="col-form-label">Description:</label>
              <textarea className="form-control" id="product-description" value={productDescription} onChange={e => setProductDescription(e.target.value)}></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          <button type="button" className="btn btn-outline-primary">Create</button>
        </div>
      </div>
    </Modal>
  )
}
