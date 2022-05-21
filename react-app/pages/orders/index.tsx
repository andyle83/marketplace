import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";
import Order from "@/components/purchase/Order";
import { useContractKit } from "@celo-tools/use-contractkit";
import { NoPurchaseRecord, OderHistoryWalletRequest } from "@/constants";
import prisma from '../../lib/prisma';
import { GetServerSideProps } from "next";

type PurchaseProps = {
  id: string;
  amount: number;
  product: string;
  seller: string;
  txid: string;
  createdAt: Date;
  business: {
    address: string;
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
      product: true,
      txid: true,
      createdAt: true,
      business : {
        select: {
          address: true
        },
      }
    },
  });
  return { props: { purchases } };
};

const Orders: React.FC<Props> = ({ purchases }) => {
  const { address } = useContractKit();

  return (
    <AppLayout>
      <main id="marketplace">
        {
          !address ? <div className="text-center p-5">{OderHistoryWalletRequest}</div> :
            <>
              {
                purchases.length == 0 ?
                  <div className="text-center p-5">{NoPurchaseRecord}</div>
                  : (
                    <>
                    <h5 className="pt-3 pb-3">Your order history</h5>
                      {purchases.map(({ id, product, amount, txid, createdAt }) =>
                        <Order key={id} name={product} total={amount} txid={txid} createdAt={createdAt} />
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