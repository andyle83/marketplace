import * as React from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function Account() {
  return (
    <AppLayout>
      <main id="marketplace">
        <div className="table-responsive p-3">
          <table className="table">
            <caption>Your order History</caption>
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Order</th>
              <th scope="col">Total</th>
              <th scope="col">Transaction</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>14/05/2022</td>
              <td>Giant BBQ</td>
              <td>120 cUSD</td>
              <td>@812381883312013801</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>16/05/2022</td>
              <td>BBQ Chicken</td>
              <td>40 cUSD</td>
              <td>@812381883312013801</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>17/05/2022</td>
              <td>Beef burrito</td>
              <td>90 cUSD</td>
              <td>@812381883312013801</td>
            </tr>
            </tbody>
          </table>
        </div>
      </main>
    </AppLayout>
  );
}