import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";
import Order from "@/components/purchase/Order";
import BigNumber from "bignumber.js";
import {useContractKit} from "@celo-tools/use-contractkit";
import {OderHistoryWalletRequest} from "@/constants";

export default function Orders() {
  const { address } = useContractKit();

  return (
    <AppLayout>
      <main id="marketplace">
        {
          !address ? <div className="text-center">{OderHistoryWalletRequest}</div> :
            <>
              <h5 className="pt-3 pb-3">Your order history</h5>
              <Order name="Giant BBQ" total={new BigNumber(500)} order_time={new Date()} />
              <Order name="BBQ Chicken" total={new BigNumber(500)} order_time={new Date()} />
              <Order name="Beef burrito" total={new BigNumber(500)} order_time={new Date()} />
            </>
        }
      </main>
    </AppLayout>
  );
}