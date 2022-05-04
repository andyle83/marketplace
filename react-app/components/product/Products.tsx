import * as React from "react";
const ERC20_DECIMALS = 18;

interface ProductProps {
  index: string,
  owner: string,
  name: string,
  image: string,
  description: string,
  location: string,
  price: number,
  sold: number
};

export default function Products({ index, name, image, description, location, price, sold }: ProductProps) {
  return (
    <div className="card mb-4">
      <img className="card-img-top" src={image} alt="..." />
        <div className="position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start">
          {sold} Sold
        </div>
        <div className="card-body text-left p-4 position-relative">
          <div className="translate-middle-y position-absolute top-0">
            Icon
          </div>
          <h2 className="card-title fs-4 fw-bold mt-2">{name}</h2>
          <p className="card-text mb-4" style={{minHeight:"82px"}}>
            {description}
          </p>
          <p className="card-text mt-4">
            <i className="bi bi-geo-alt-fill"></i>
            <span>{location}</span>
          </p>
          <div className="d-grid gap-2">
            <a className="btn btn-lg btn-outline-primary buyBtn fs-6 p-3" id={index}>
              Buy for {price.toFixed(2)} cUSD
            </a>
          </div>
        </div>
    </div>
  );
}
