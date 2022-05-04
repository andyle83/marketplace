import * as React from "react";
import BigNumber from "bignumber.js"
import { useContractKit } from "@celo-tools/use-contractkit";
import AppLayout from "@/components/layout/AppLayout";
import Products from '../components/product/Products';

import marketplaceAbi from '../contract/marketplace.abi.json';
import erc20Abi from '../contract/erc20.abi.json';
import {useEffect, useState} from "react";

const ERC20_DECIMALS = 18;
const MPContractAddress = "0xF377516621Cef90E12C0b5133adc783A336B1123";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

let contract;

export default function App() {
  // get contract kit
  const { kit, address, network } = useContractKit();
  const [products, setProducts] = useState([]);

  // get contract of our marketplace
  // @ts-ignore
  contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress);

  // get products
  useEffect(() => {
    async function fetchProducts() {
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
      await Promise.all(_products)

      setProducts(_products);
    }

    fetchProducts().then(_ => console.log(`fetch data successful !`));

  }, [address, network]);

  const renderProducts = () => {
    return products.map((product, index) => {
      console.log(index)
      console.log(product.name)
      return (
        <div className="col-md-4" key={index}>
          {product.name}
        </div>
      )
    })
  }

  return (
    <AppLayout title="Marketplace" description="A commune marketplace">
      {renderProducts()}
    </AppLayout>
  );
}