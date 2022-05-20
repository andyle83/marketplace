import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";
import Order from "@/components/purchase/Order";
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

const Orders: React.FC<Props> = ({ purchases }) => {
  console.log(JSON.stringify(purchases));
  const { address } = useContractKit();

  return (
    <AppLayout>
      <main id="marketplace">
        {
          !address ? <div className="text-center p-5">{OderHistoryWalletRequest}</div> :
            <>
              {
                purchases.length == 0 ?
                  <h5 className="pt-3 pb-3">You have no purchase record</h5>
                  : (
                    <>
                    <h5 className="pt-3 pb-3">Your order history</h5>
                      {purchases.map(purchase =>
                        <Order key={purchase.id} name="Product Name" total={purchase.amount} order_time={new Date()} />
                      )}
                    </>
                  )
              }
            </>
        }
      </main>
    </AppLayout>
  );
}

export default Orders;