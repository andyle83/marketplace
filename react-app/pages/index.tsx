import * as React from "react";
import { useEffect, useState } from "react";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import { useContractKit } from "@celo-tools/use-contractkit";

import AppLayout from "@/components/layout/AppLayout";
import Products from "@/components/product/Products";
import {updateLoadingState, updateNotification, updateReloadProduct} from "@/state/app/reducer";

import { LoadingProductStatus } from '@/constants';
import { MPContractAddress } from '@/constants';
import marketplaceAbi from "../contracts/Marketplace.sol/Marketplace.json";

export default function App() {
  const { kit, address, network } = useContractKit();
  const [products, setProducts] = useState([]);
  const [isProductAdded, setIsProductAdded] = useState(false);
  const dispatch = useDispatch();

  // Reload when a product is purchased
  const reloadProduct = useSelector(
    (state:RootStateOrAny) => state.app.products.reloadProduct
  );

  // @ts-ignore
  const contract = new kit.web3.eth.Contract(marketplaceAbi.abi, MPContractAddress);

  contract.events.newProduct(function(error, event) {
    if (event) {
      setIsProductAdded(true);
    }
  });

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

    // fetching updated product list when customer buy a product or business add a new product
    if (reloadProduct || isProductAdded) {
      dispatch(updateNotification({message: LoadingProductStatus}));

      fetchProducts().then(_ =>
        dispatch(updateLoadingState({isLoading: false}))
      ).catch(e => console.error(e));

      dispatch(updateReloadProduct( { reloadProduct: !reloadProduct}));

      setIsProductAdded(!isProductAdded);
    }
  }, [address, network, dispatch, contract.methods]);

  const renderProducts = () => {
    // update notification
    return products.map((product, index) =>
        <div className="col-md-4" key={index}>
          <Products {...product} />
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