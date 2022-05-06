import * as React from "react";
import BigNumber from "bignumber.js"
import blockies from 'ethereum-blockies';
import {useDispatch} from "react-redux";

import { updateLoadingState, updateNotificationMessage } from "@/state/app/reducer";
import {useContractKit} from "@celo-tools/use-contractkit";

const ERC20_DECIMALS = 18;
import erc20Abi from '@/contract/erc20.abi.json';
import marketplaceAbi from "@/contract/Marketplace.abi.json";
const MPContractAddress = "0xF377516621Cef90E12C0b5133adc783A336B1123"
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

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
  const { kit } = useContractKit();

  // @ts-ignore
  const cUSDContract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress);
  // @ts-ignore
  const contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress);

  const dispatch = useDispatch();

  const approve = async (price: BigNumber) => {
    return await cUSDContract.methods
                  .approve(MPContractAddress, price)
                  .send({ from: kit.defaultAccount })
  }

  const purchaseHandler = async (index: string, name: string, price: BigNumber) => {
    dispatch(updateLoadingState({ isLoading: true }));
    dispatch(updateNotificationMessage({ notificationMessage: "⌛ Waiting for payment approval..." }));

    try {
      await approve(price)
    } catch (error) {
      dispatch(updateNotificationMessage({ notificationMessage: "⚠️ ${error}." }));
    }

    dispatch(updateNotificationMessage({ notificationMessage:  `⌛ Awaiting payment for "${name}"...`}));

    try {
      // purchase product
      await contract.methods.buyProduct(index).send({ from: kit.defaultAccount })
      dispatch(updateNotificationMessage({ notificationMessage:  `🎉 You successfully bought "${name}".`}));
    } catch (error) {
      dispatch(updateNotificationMessage({ notificationMessage: "⚠️ ${error}." }));
    }
  }

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
            <a className="btn btn-lg btn-outline-primary buyBtn fs-6 p-3"
               id={index}
               onClick={() => purchaseHandler(index, name, price)}>
              Buy for {price.shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD
            </a>
          </div>
        </div>
    </div>
  );
}
