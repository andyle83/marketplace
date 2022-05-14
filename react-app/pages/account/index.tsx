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
              <div className="col-6">
                Order Place
              </div>
              <div className="col-4">
                Total
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                20/05/2022
              </div>
              <div className="col-4">
                230 cUSD
              </div>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">Giant BBQ</h5>
            <p className="card-text">Transaction Information (Sender / Receiver)</p>
            <a href="#" className="btn btn-outline-primary">
              <i className="bi bi-bootstrap-reboot" style={{marginRight: "0.5rem"}}></i>
              Buy Again
            </a>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}