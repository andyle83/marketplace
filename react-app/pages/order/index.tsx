import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";
import Order from "@/components/purchase/Order";
import BigNumber from "bignumber.js";
import { useContractKit } from "@celo-tools/use-contractkit";
import { OderHistoryWalletRequest} from "@/constants";
import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";

type PurchaseProps = {
  id: string;
  amount: number;
  profile: {
    address: string;
    balance: number;
  }
}

type Props = {
  purchases: PurchaseProps[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const purchases = await prisma.purchase.findMany({
    select : {
      id: true,
      amount: true,
      profile: {
        select: {
          address: true,
          balance: true
        }
      }
    },
  });
  return { props: { purchases } };
};

const Orders: React.FC<Props> = (props) => {
  console.log(props.purchases.length);
  const { address } = useContractKit();

  return (
    <AppLayout>
      <main id="marketplace">
        {
          !address ? <div className="text-center p-5">{OderHistoryWalletRequest}</div> :
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

export default Orders;