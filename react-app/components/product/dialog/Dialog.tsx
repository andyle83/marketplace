import * as React from "react";
import 'react-responsive-modal/styles.css';
import styles from './Dialog.module.css';
import { Modal } from 'react-responsive-modal';

interface DialogProps {
  openModal: boolean,
  onClose: () => void,
}

export function Dialog({ openModal, onClose }: DialogProps) {
  return (
    <Modal
      open={openModal}
      onClose={onClose}
      showCloseIcon={false}
      center
      classNames={{
        overlay: styles.customOverlay,
        modal: styles.customModal
    }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create a new product</h5>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="product-name" className="col-form-label">Name:</label>
              <input type="text" className="form-control" id="product-name" />
            </div>
            <div className="mb-3">
              <label htmlFor="product-image-url" className="col-form-label">Image URL:</label>
              <input type="text" className="form-control" id="product-image-url" />
            </div>
            <div className="mb-3">
              <label htmlFor="product-location" className="col-form-label">Location:</label>
              <input className="form-control" id="product-location"></input>
            </div>
            <div className="mb-3">
              <label htmlFor="product-price" className="col-form-label">Price:</label>
              <input className="form-control" id="product-price"></input>
            </div>
            <div className="mb-3">
              <label htmlFor="product-description" className="col-form-label">Description:</label>
              <textarea className="form-control" id="product-description"></textarea>
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
