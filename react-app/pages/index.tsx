import * as React from "react";
import BigNumber from "bignumber.js"
import { useContractKit } from "@celo-tools/use-contractkit";
import AppLayout from "@/components/layout/AppLayout";

import marketplaceAbi from '../contract/marketplace.abi.json';
import erc20Abi from '../contract/erc20.abi.json';

const ERC20_DECIMALS = 18;
const MPContractAddress = "0xF377516621Cef90E12C0b5133adc783A336B1123";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

let contract;
let products = [];

// using contract to get product
const getProducts = async function() {
  const _productsLength = await contract.methods.getProductsLength().call()
  const _products = []
  for (let i = 0; i < _productsLength; i++) {
    let _product = new Promise(async (resolve, reject) => {
      let p = await contract.methods.readProduct(i).call()
      resolve({
        index: i,
        owner: p[0],
        name: p[1],
        image: p[2],
        description: p[3],
        location: p[4],
        price: new BigNumber(p[5]),
        sold: p[6],
      })
    })
    _products.push(_product)
  }
  // Wait until products are updated and render products list again
  products = await Promise.all(_products)
}

export default function App() {
  // get contract kit
  const { kit } = useContractKit();

  // get contract of our marketplace
  // @ts-ignore
  contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress);

  // get products
  getProducts().then(_ => console.log(`Number of products ${products.length}`));

  return (
    <AppLayout title="Marketplace" description="A commune marketplace">
      This is where i have to get products
    </AppLayout>
  );
}