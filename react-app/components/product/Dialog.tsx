import * as React from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

interface DialogProps {
  openModal: boolean,
  onClose: () => void,
}

export default function Dialog({ openModal, onClose }: DialogProps) {
  return (
    <Modal open={openModal} onClose={onClose} showCloseIcon={false} center>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create a new product</h5>
        </div>
        <div className="modal-body">
          <p>Product form</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          <button type="button" className="btn btn-outline-primary">Save</button>
        </div>
      </div>
    </Modal>
  )
}
