import React from 'react';

function Header() {
  return (
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
  )
}

export default  Header;