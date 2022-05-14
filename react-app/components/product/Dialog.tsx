import * as React from "react";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm, SubmitHandler } from "react-hook-form";

interface DialogProps {
  openModal: boolean,
  onClose: () => void,
}

type IFormInputs = {
  name: string,
  imageUrl: string,
  location: string,
  price: number,
  description: string,
}

export default function Dialog({ openModal, onClose }: DialogProps) {
  const { register, handleSubmit, watch } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log('This is called');
    console.log(data);
  }

  console.log(watch("name")) // watch input value by passing the name of it

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
          <h5 className="modal-title">Enter a new product:</h5>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)} id="newProduct">
            <div className="mb-3">
              <label htmlFor="name" className="col-form-label">Name:</label>
              <input type="text" className="form-control" id="name" {...register("name", { required: true })}  />
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="col-form-label">Image URL:</label>
              <input type="text" className="form-control" id="imageUrl" {...register("imageUrl")} />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="col-form-label">Location:</label>
              <input className="form-control" id="location" {...register("location")} />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="col-form-label">Price:</label>
              <div className="input-group">
                <input className="form-control" id="price" {...register("price")} />
                <div className="input-group-append">
                  <span className="input-group-text">cUSD</span>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="col-form-label">Description:</label>
              <textarea className="form-control" id="description" {...register("description")} />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
          <button type="submit" className="btn btn-outline-primary" form="newProduct">Create</button>
        </div>
      </div>
    </Modal>
  )
}
