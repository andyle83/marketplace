import * as React from "react";
import { Modal } from 'react-responsive-modal';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number, mixed } from "yup";

import 'react-responsive-modal/styles.css';
import {
  ValidImageURL,
  ValidProductDescription,
  ValidProductLocation,
  ValidProductName,
  ValidProductPrice
} from "@/constants";

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

const validProductSchema = object({
  name: string().required(ValidProductName),
  location: string().required(ValidProductLocation),
  price: number().positive().integer().required(ValidProductPrice),
  description: string().required(ValidProductDescription),
  imageUrl: mixed().required(ValidImageURL)
    .test("fileSize", "File sizes is too large", (value) => {
      // empty or has size smaller than 5 mb.
      return (value.length == 0) || ((value.length > 0) && (value[0].size <= 5242880));
    })
    .test("fileType", "Unsupported file format", (value) =>{
      return value.length && ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
    })
}).required();

export default function Dialog({ openModal, onClose }: DialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(validProductSchema)
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    console.log(data);
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
          <h5 className="modal-title">Enter a new product</h5>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(onSubmit)} id="newProduct">
            <div className="mb-3">
              <label htmlFor="name" className="col-form-label">Name</label>
              <input type="text" className="form-control" id="name" {...register("name", { required: true })}  />
              <div role="alert" className="mt-2 text-danger">{errors.name?.message}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="col-form-label">Image URL</label>
              <div className="input-group">
                <input type="file" className="form-control" id="imageUrl" {...register("imageUrl", { required: true })} />
              </div>
              <div role="alert" className="mt-2 text-danger">{errors.imageUrl?.message}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="col-form-label">Location</label>
              <input className="form-control" id="location" {...register("location", { required: true })} />
              <div role="alert" className="mt-2 text-danger">{errors.location?.message}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="col-form-label">Price</label>
              <div className="input-group">
                <input className="form-control" id="price" {...register("price", { required: true })} />
                <div className="input-group-append">
                  <span className="input-group-text">cUSD</span>
                </div>
              </div>
              <div role="alert" className="mt-2 text-danger">{errors.location?.message}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="col-form-label">Description</label>
              <textarea className="form-control" id="description" {...register("description", { required: true })} />
              <div role="alert" className="mt-2 text-danger">{errors.description?.message}</div>
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
