import * as React from "react";
import moment from "moment";

interface OrderProps {
  name: string,
  total: number,
  order_time: Date,
}

const Order = ({ name, total, order_time }: OrderProps): JSX.Element => {
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
        <p className="card-text">Transaction Information (Sender / Receiver)</p>
        <a href="#" className="btn btn-outline-primary">
          <i className="bi bi-bootstrap-reboot" style={{marginRight: "0.5rem"}}></i>
          Buy Again
        </a>
      </div>
    </div>
  )
}

export default Order;
