import React from 'react';
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import marketplaceAbi from '../contract/marketplace.abi.json'
import erc20Abi from "../contract/erc20.abi.json"

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

const ERC20_DECIMALS = 18
const MPContractAddress = "0xF377516621Cef90E12C0b5133adc783A336B1123"
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

let kit
let contract
let products = []

const connectCeloWallet = async function () {
  if (window.celo) {
    // notification("⚠️ Please approve this DApp to use it.")
    try {
      await window.celo.enable()
      // notificationOff()

      // KitContract initialize
      const web3 = new Web3(window.celo)
      kit = newKitFromWeb3(web3)

      // Get account with information (i.e, balance)
      const accounts = await kit.web3.eth.getAccounts()
      kit.defaultAccount = accounts[0]

      // Deployed contract reference
      contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
    } catch (error) {
      // notification(`⚠️ ${error}.`)
    }
  } else {
    // notification("⚠️ Please install the CeloExtensionWallet.")
  }
}

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
