import * as React from "react";
import 'react-responsive-modal/styles.css';
import styles from './Dialog.module.css';
import { Modal } from 'react-responsive-modal';

interface DialogProps {
  openModal: boolean,
  onClose: () => void,
}

export default function Dialog({ openModal, onClose }: DialogProps) {
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
              <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
              <input type="text" className="form-control" id="recipient-name" />
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">Message:</label>
              <textarea className="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          <button type="button" className="btn btn-outline-primary">Save</button>
        </div>
      </div>
    </Modal>
  )
}
