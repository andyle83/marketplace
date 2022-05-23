import * as React from "react";
import { useDispatch } from "react-redux";

import {updateBalance, updateNotification, updateReloadProduct} from "@/state/app/reducer";
import { useContractKit } from "@celo-tools/use-contractkit";

import erc20Abi from '@/contract/erc20.abi.json';
import marketplaceAbi from "@/contract/Marketplace.abi.json";
import Identicon from "@/components/product/Identicon";

import {
  MPContractAddress,
  cUSDContractAddress,
  BuyNewProductSuccess, ERC20_DECIMALS
} from '@/constants';
import Image from "next/image";
import { ethers } from "ethers";

interface ProductProps {
  index: string,
  owner: string,
  name: string,
  image: string,
  description: string,
  location: string,
  price: number,
  sold: number,
}

const Products = (
  { index, owner, name, image, description, location, price, sold }: ProductProps):JSX.Element => {
  const { kit } = useContractKit();
  const showingPrice = ethers.utils.formatUnits(price, ERC20_DECIMALS);

  // @ts-ignore
  const cUSDContract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress);
  // @ts-ignore
  const contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress);

  const dispatch = useDispatch();

  const approve = async (price) => {
    const parsedPrice = ethers.utils.parseUnits(price, ERC20_DECIMALS);
    return await cUSDContract.methods
                  .approve(MPContractAddress, parsedPrice)
                  .send({ from: kit.defaultAccount })
  }

  const dispatchMessage = (message: string) => {
    dispatch(updateNotification({ message: message }));
  }

  const purchaseHandler = async (index: string, name: string, price: number) => {
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
      dispatchMessage(BuyNewProductSuccess(name));

      // reloading product with new number of purchase
      dispatch(updateReloadProduct({ reloadProduct: true }));

      // update balance in wallet
      dispatch(updateBalance({ amount: showingPrice }));
    } catch (e) {
      dispatchMessage(`⚠️ ${e}.`);
    }
  }

  const showInMapClicked = () => {
    window.open("https://maps.google.com?q="+0+ "," +0 );
  };

  return (
    <div className="card mb-4">
      <Image src={image} width={300} height={300} alt={name} />
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
        <p className="card-text tw-text-sm mb-2">
          <i className="bi bi-pin-map-fill" onClick={showInMapClicked} />
          <span className="p-2">{location}</span>
        </p>
        <p className="card-text tw-text-sm">
          <i className="bi bi-telephone-fill" />
          <span className="p-2">043-000-482</span>
        </p>
        <div className="d-grid gap-2">
          <a className="btn btn-outline-primary"
             id={index}
             onClick={() => purchaseHandler(index, name, price)}>
            Buy for {showingPrice} cUSD
          </a>
        </div>
      </div>
    </div>
  );
}

export default Products;