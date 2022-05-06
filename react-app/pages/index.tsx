import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { useContractKit } from "@celo-tools/use-contractkit";
import BigNumber from "bignumber.js"

import AppLayout from "@/components/layout/AppLayout";
import Products from "@/components/product/Products";
import { updateLoadingState } from "@/state/app/reducer";

import marketplaceAbi from '../contract/marketplace.abi.json';
const MPContractAddress = "0xF377516621Cef90E12C0b5133adc783A336B1123";

export default function App() {
  // get contract kit
  const { kit, address, network } = useContractKit();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // get contract of our marketplace
  // @ts-ignore
  const contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress);

  // get products
  useEffect(() => {
    async function fetchProducts() {
      const _productsLength = await contract.methods.getProductsLength().call()
      const _products = []
      for (let i = 0; i < _productsLength; i++) {
        let _product = new Promise(async (resolve, _) => {
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
      setProducts(await Promise.all(_products));
    }

    fetchProducts().catch(e => console.error(e));

    // update notification
    dispatch(updateLoadingState({isLoading: false}));

  }, [address, network]);

  const renderProducts = () => {
    return products.map((product, index) =>
        <div className="col-md-4" key={index}>
          <Products {...product} />
        </div>
    )
  }

  return (
    <AppLayout title="Marketplace" description="A commune marketplace">
      <main id="marketplace" className="row">
        {renderProducts()}
      </main>
    </AppLayout>
  );
}