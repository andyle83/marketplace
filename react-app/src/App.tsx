import React from 'react';
import './App.css';

import { BsShop } from "react-icons/bs";

function App() {
  return (
    <div className="container mt-2" style={{maxWidth: "72em"}}>
      <header>
        <nav className="navbar bg-white navbar-light border-bottom">
          <div className="container-fluid">
            <a className="navbar-brand m-0 h4 fw-bold" href="/">Marketplace</a>
            <span className="nav-link border rounded-pill bg-warning">
                    <span id="balance">0</span>cUSD
                </span>
          </div>
        </nav>
        <div className="alert alert-warning sticky-top mt-2" role="alert">
          <span id="notification">⌛ Loading...</span>
        </div>
        <div className="mb-4" style={{marginTop: "4em"}}>
          <a
            className="btn btn-dark rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
            href="/"
          >
            Add product
          </a>
        </div>
      </header>
      <main id="marketplace" className="row"></main>
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
    </div>
  );
}

export default App;
