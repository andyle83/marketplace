import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useContractKit } from "@celo-tools/use-contractkit";

import AppLayout from "@/components/layout/AppLayout";
import Products from "@/components/product/Products";
import { updateLoadingState, updateNotification } from "@/state/app/reducer";

import { LoadingProductStatus } from '@/constants';
import { MPContractAddress } from '@/constants';
import marketplaceAbi from "@/contract/Marketplace.abi.json";

export default function App() {
  // get contract kit
  const { kit, address, network } = useContractKit();
  const [products, setProducts] = useState([]);
  const [reloadProduct, setReloadProduct] = useState<boolean>(true);
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
            price: p[5],
            sold: p[6],
          })
        })
        _products.push(_product)
      }
      setProducts(await Promise.all(_products));
    }

    if (reloadProduct) {
      dispatch(updateNotification({message: LoadingProductStatus}));

      fetchProducts().then(_ =>
        dispatch(updateLoadingState({isLoading: false}))
      ).catch(e => console.error(e));

      setReloadProduct(false);
    }
  }, [address, network, dispatch, contract.methods]);

  const renderProducts = () => {
    // update notification
    return products.map((product, index) =>
        <div className="col-md-4" key={index}>
          <Products {...product} reloadProduct={(reload) => setReloadProduct(reload)}  />
        </div>
    )
  }

  return (
    <AppLayout>
      <main id="marketplace" className="row">
        {renderProducts()}
      </main>
    </AppLayout>
  );
}