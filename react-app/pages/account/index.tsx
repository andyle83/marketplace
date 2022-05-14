import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function Account() {
  return (
    <AppLayout>
      <main id="marketplace">
        <h5 className="pt-3 pb-3">Your order history</h5>
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-sm">
                Order Place
              </div>
              <div className="col-sm">
                Total
              </div>
              <div className="col-sm">
                Transaction
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                20/05/2022
              </div>
              <div className="col-sm">
                230 cUSD
              </div>
              <div className="col-sm">
                0x8787HHKHGHBJ
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">Giant BBQ</h5>
            <p className="card-text">Any details information of this order.</p>
            <a href="#" className="btn btn-outline-primary">Buy Again</a>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}