import * as React from "react";
import BigNumber from "bignumber.js"
import blockies from 'ethereum-blockies';

const ERC20_DECIMALS = 18;

interface ProductProps {
  index: string,
  owner: string,
  name: string,
  image: string,
  description: string,
  location: string,
  price: BigNumber,
  sold: number
}

function identiconTemplate(_address) {
  const icon = blockies
    .create({
      seed: _address,
      size: 8,
      scale: 16,
    })
    .toDataURL()

  const transaction = `https://alfajores-blockscout.celo-testnet.org/address/${_address}/transactions`;

  return (
    <div className="rounded-circle overflow-hidden d-inline-block border border-white border-2 shadow-sm m-0">
      <a href={transaction} target="_blank">
        <img src={icon} width="48" alt={_address} />
      </a>
    </div>
  )
}

export default function Products({ index, owner, name, image, description, location, price, sold }: ProductProps) {
  return (
    <div className="card mb-4">
      <img className="card-img-top" src={image} alt="..." />
        <div className="position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start">
          {sold} Sold
        </div>
        <div className="card-body text-left p-4 position-relative">
          <div className="translate-middle-y position-absolute top-0">
            {identiconTemplate(owner)}
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
              Buy for {price.shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD
            </a>
          </div>
        </div>
    </div>
  );
}
