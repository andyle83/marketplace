import React from "react";
import {BsShop} from "react-icons/bs";

function Footer() {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md text-center">
          <BsShop size={26}/>
          <small className="d-block mb-3 text-muted">© 2022-2050</small>
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Cool stuff</a></li>
            <li><a className="text-muted" href="/">Team feature</a></li>
            <li><a className="text-muted" href="/">Stuff for developers</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="/">Team</a></li>
            <li><a className="text-muted" href="/">Privacy</a></li>
            <li><a className="text-muted" href="/">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;