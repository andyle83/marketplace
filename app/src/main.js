import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit'
import BigNumber from "bignumber.js"
import marketplaceAbi from '../contract/marketplace.abi.json'
import erc20Abi from "../contract/erc20.abi.json"
import marketplaceAbi from '../contract/marketplace.abi.json';

const ERC20_DECIMALS = 18
const MPContractAddress = "0xF377516621Cef90E12C0b5133adc783A336B1123"
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

let kit
let contract
let products = []

const connectCeloWallet = async function () {
    if (window.celo) {
        notification("⚠️ Please approve this DApp to use it.")
        try {
            await window.celo.enable()
            notificationOff()

            // KitContract initialize
            const web3 = new Web3(window.celo)
            kit = newKitFromWeb3(web3)

            // Get account with information (i.e, balance)
            const accounts = await kit.web3.eth.getAccounts()
            kit.defaultAccount = accounts[0]

            // Deployed contract reference
            contract = new kit.web3.eth.Contract(marketplaceAbi, MPContractAddress)
        } catch (error) {
            notification(`⚠️ ${error}.`)
        }
    } else {
        notification("⚠️ Please install the CeloExtensionWallet.")
    }
}

// Approve for payment
async function approve(_price) {
    console.log(`approve call with price ${_price.shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD`)
    const cUSDContract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)

    // Payer is default account that get from above method: connectCeloWallet
    const result = await cUSDContract.methods
        .approve(MPContractAddress, _price) // send money to contract's owner
        .send({ from: kit.defaultAccount })
    return result
}

// Calling contract via RPC
const getProducts = async function() {
    const _productsLength = await contract.methods.getProductsLength().call()
    const _products = []
    for (let i = 0; i < _productsLength; i++) {
        let _product = new Promise(async (resolve, reject) => {
            let p = await contract.methods.readProduct(i).call()
            resolve({
                index: i,
                owner: p[0],
                name: p[1],
                image: p[2],
                description: p[3],
                location: p[4],
                price: new BigNumber(p[5]),
                sold: p[6],
            })
        })
        _products.push(_product)
    }
    // Wait until products are updated and render products list again
    products = await Promise.all(_products)
    renderProducts()
}

// Return select wallet balance
const getBalance = async function () {
    const totalBalance = await kit.getTotalBalance(kit.defaultAccount)
    // Need to shift 18 digits, and round up 2
    const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2)
    document.querySelector("#balance").textContent = cUSDBalance
}

// Iterate product list to create new product UI component
function renderProducts() {
    document.getElementById("marketplace").innerHTML = ""
    products.forEach((_product) => {
        const newDiv = document.createElement("div")
        newDiv.className = "col-md-4"
        newDiv.innerHTML = productTemplate(_product)
        document.getElementById("marketplace").appendChild(newDiv)
    })
}

// UI template for each product item
function productTemplate(_product) {
    return `
    <div class="card mb-4">
      <img class="card-img-top" src="${_product.image}" alt="...">
      <div class="position-absolute top-0 end-0 bg-warning mt-4 px-2 py-1 rounded-start">
        ${_product.sold} Sold
      </div>
            <div class="card-body text-left p-4 position-relative">
        <div class="translate-middle-y position-absolute top-0">
        ${identiconTemplate(_product.owner)}
        </div>
        <h2 class="card-title fs-4 fw-bold mt-2">${_product.name}</h2>
        <p class="card-text mb-4" style="min-height: 82px">
          ${_product.description}             
        </p>
        <p class="card-text mt-4">
          <i class="bi bi-geo-alt-fill"></i>
          <span>${_product.location}</span>
        </p>
        <div class="d-grid gap-2">
          <a class="btn btn-lg btn-outline-primary buyBtn fs-6 p-3" id=${
        _product.index
    }>
            Buy for ${_product.price.shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD
          </a>
        </div>
      </div>
    </div>
  `
}

// Create a small image (called identicon), represent a hash value which address of product owner
function identiconTemplate(_address) {
    const icon = blockies
        .create({
            seed: _address,
            size: 8,
            scale: 16,
        })
        .toDataURL()

    return `
  <div class="rounded-circle overflow-hidden d-inline-block border border-white border-2 shadow-sm m-0">
    <a href="https://alfajores-blockscout.celo-testnet.org/address/${_address}/transactions"
        target="_blank">
        <img src="${icon}" width="48" alt="${_address}">
    </a>
  </div>
  `
}

// control notification message
function notification(_text) {
    document.querySelector(".alert").style.display = "block"
    document.querySelector("#notification").textContent = _text
}

function notificationOff() {
    document.querySelector(".alert").style.display = "none"
}

// event handler
window.addEventListener("load", async () => {
    notification("⌛ Loading...")
    await connectCeloWallet()
    await getBalance()
    await getProducts()
    notificationOff()
})

// handle when user click on new product button
document
    .querySelector("#newProductBtn")
    .addEventListener("click", async (_) => {
        const params = [
            document.getElementById("newProductName").value,
            document.getElementById("newImgUrl").value,
            document.getElementById("newProductDescription").value,
            document.getElementById("newLocation").value,
            new BigNumber(document.getElementById("newPrice").value)
                .shiftedBy(ERC20_DECIMALS)
                .toString()
        ]
        notification(`⌛ Adding "${params[0]}"...`)
        try {
            const result = await contract.methods
                .writeProduct(...params)
                .send({ from: kit.defaultAccount })
        } catch (error) {
            notification(`⚠️ ${error}.`)
        }
        notification(`🎉 You successfully added "${params[0]}".`)
        await getProducts()
    });

// handle when user click on buy product button
document.querySelector("#marketplace").addEventListener("click", async (e) => {
    if(e.target.className.includes("buyBtn")) {
        const index = e.target.id
        notification("⌛ Waiting for payment approval...")
        try {
            await approve(products[index].price)
        } catch (error) {
            notification(`⚠️ ${error}.`)
        }
        notification(`⌛ Awaiting payment for "${products[index].name}"...`)
        try {
            // purchase product
            const result = await contract.methods
                // TODO: better with type system in here
                .buyProduct(index)
                .send({ from: kit.defaultAccount })
            notification(`🎉 You successfully bought "${products[index].name}".`)
            await getProducts()
            await getBalance()
        } catch (error) {
            notification(`⚠️ ${error}.`)
        }
    }
});


