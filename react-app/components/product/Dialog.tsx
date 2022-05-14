import * as React from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm, SubmitHandler } from "react-hook-form";

interface DialogProps {
  openModal: boolean,
  onClose: () => void,
}

type Inputs = {
  productName: string,
  imageUrl: string,
  location: string,
  price: number,
  productDescription: string,
}

export default function Dialog({ openModal, onClose }: DialogProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> =  data => {
    console.log('This is called');
    console.log(data);
  }

  console.log(watch("productName")) // watch input value by passing the name of it

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="product-name" className="col-form-label">Product Name:</label>
              <input type="text" className="form-control" id="product-name" {...register("productName")} />
            </div>
            <div className="mb-3">
              <label htmlFor="product-image-url" className="col-form-label">Image URL:</label>
              <input type="text" className="form-control" id="product-image-url" {...register("imageUrl")} />
            </div>
            <div className="mb-3">
              <label htmlFor="product-location" className="col-form-label">Location:</label>
              <input className="form-control" id="product-location" {...register("location")}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="product-price" className="col-form-label">Price:</label>
              <div className="input-group">
                <input className="form-control" id="product-price" {...register("price")}></input>
                <div className="input-group-append">
                  <span className="input-group-text">cUSD</span>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="product-description" className="col-form-label">Product Description:</label>
              <textarea className="form-control" id="product-description" {...register("productDescription")}></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          <button type="submit" className="btn btn-outline-primary">Create</button>
        </div>
      </div>
    </Modal>
  )
}
