import * as React from "react";
import { IoIosSend } from "react-icons/io";
import { BsShop } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md text-center">
          <BsShop size={32} color="red" />
          <small className="d-block mb-3 text-muted mt-2">© 2022-2050</small>
        </div>
        <div className="col-12 col-md">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2 font-monospace">
                  <strong>Sign up newsletter</strong>
                </p>
              </div>
              <div className="col-md-4 col-12">
                <div className="form-outline form-white mb-4 border border-dark">
                  <input type="email" id="form5Example21" className="form-control"/>
                </div>
              </div>
              <div className="col-auto">
                <button type="submit"
                        className="btn btn-outline-danger mb-4"
                        style={{display: "flex", alignItems: "center"}
                }>
                  <IoIosSend />
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}
