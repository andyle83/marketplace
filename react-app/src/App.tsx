import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container mt-2" style={{maxWidth: "72em"}}>
      <Header />
      <main id="marketplace" className="row"></main>
      <Footer />
    </div>
  );
}

export default App;
