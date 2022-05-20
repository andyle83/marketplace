import * as React from "react";
import moment from "moment";
import {useContractKit} from "@celo-tools/use-contractkit";
import {truncate} from "@/utils";

type OrderProps = {
  name: string;
  total: number;
  txid: string;
  order_time: Date;
}

const Order = ({ name, total, txid, order_time }: OrderProps): JSX.Element => {
  const { network } = useContractKit();
  const txUrl = `${network.explorer}/tx/${txid}`;
  return (
    <div className="card mb-4">
      <div className="card-header text-secondary">
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
            {moment(order_time).format('l')}
          </div>
          <div className="col-4">
            {total} cUSD
          </div>
        </div>
      </div>
      <div className="card-body">
        <h6>{name}</h6>
        <p className="card-text">
          <ul>
            <li>Tracking transaction:
              <span className="badge alert-warning">
                <a href={txUrl} className="link-secondary">{truncate(txid)}</a>
              </span>
            </li>
          </ul>
        </p>
        <a href="#" className="btn btn-outline-primary">
          <i className="bi bi-bootstrap-reboot" style={{marginRight: "0.5rem"}}></i>
          Buy Again
        </a>
      </div>
    </div>
  )
}

export default Order;
