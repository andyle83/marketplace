import * as React from "react";
import BigNumber from "bignumber.js"
import { useDispatch } from "react-redux";

import { updateNotification } from "@/state/app/reducer";
import { useContractKit } from "@celo-tools/use-contractkit";

import erc20Abi from '@/contract/erc20.abi.json';
import marketplaceAbi from "@/contract/Marketplace.abi.json";
import Identicon from "@/components/product/Identicon";

import { MPContractAddress, cUSDContractAddress, ERC20_DECIMALS } from '@/constants';

interface ProductProps {
  index: string,
  owner: string,
  name: string,
  image: string,
  description: string,
  location: string,
  price: BigNumber,
  sold: number,
  onReload: (isReload: boolean) => void,
}

export default function Products( { index, owner, name, image, description, location, price, sold, onReload }: ProductProps) {
  const { kit } = useContractKit();
  const productPrice = parseFloat(price.shiftedBy(-ERC20_DECIMALS).toFixed(2));

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

  const dispatchMessage = (message: string) => {
    dispatch(updateNotification({ message: message }));
  }

  const purchaseHandler = async (index: string, name: string, price: BigNumber) => {
    dispatchMessage(`⌛ Waiting payment approval for ${name}`);

    try {
      await approve(price)
    } catch (e) {
      dispatchMessage(`⚠️ ${e}.`);
    }

    try {
      // purchase product
      await contract.methods.buyProduct(index).send({ from: kit.defaultAccount })

      // update notification message and rerender component
      dispatchMessage(`🎉 You successfully bought "${name}".`);

      // TODO: ask parent to fetch and reload product only + update balance
      onReload(true);
    } catch (e) {

      // TODO: Revert the balance if exception occur
      dispatchMessage(`⚠️ ${e}.`);
    }
  }

  const showInMapClicked = () => {
    window.open("https://maps.google.com?q="+0+ "," +0 );
  };

  return (
    <div className="card mb-4">
      <img className="card-img-top" src={image} alt="..." />
        <div className="position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start">
          {sold} Sold
        </div>
        <div className="card-body text-left p-4 position-relative">
          <div className="translate-middle-y position-absolute top-0">
            <Identicon address={owner} />
          </div>
          <h2 className="card-title fs-4 fw-bold mt-2">{name}</h2>
          <p className="card-text mb-4" style={{ minHeight:"82px" }}>
            {description}
          </p>
          <p className="card-text mt-4">
            <i className="bi bi-pin-map-fill" onClick={showInMapClicked}></i>
            <span className="p-2">{location}</span>
          </p>
          <div className="d-grid gap-2">
            <a className="btn btn-outline-primary"
               id={index}
               onClick={() => purchaseHandler(index, name, price)}>
              Buy for {productPrice} cUSD
            </a>
          </div>
        </div>
    </div>
  );
}
