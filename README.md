## Celo 101 course - Marketplace

### Introduce

This project is about a simple marketplace to manage / selling product. Is based on great course in decade.org about Celo (101 & 102). It helps us to understand about Solidity, Celo blockchain, and how to make a full-stack application.

Here are some features are implemented:
- See products hosted on the Celo Blockchain
- Purchase products with cUSD and pay the owner
- Add your own products to the dApp

Published website: https://andyle83.github.io/marketplace/

### Technology:

Blockchain:
- Written in Solidity for Celo blockchain network
- Deploying in Celo testnet: https://alfajores-blockscout.celo-testnet.org/
- Deploy address: `0xF377516621Cef90E12C0b5133adc783A336B1123` (can be changed)
- Development framework: HardHat

Frontend:
- Nodejs application 
- [Webpack](https://webpack.js.org/guides/getting-started/) as module bundler
- Utilise [Celo ContractKit](https://docs.celo.org/developer-guide/contractkit/setup)
- Using jQuery to update UI component with simple even handler function

### Application screenshot

- Home Page

![Home Page](https://raw.githubusercontent.com/andyle83/marketplace/main/demo/1.png)

- Add New Product

![Add New Product](https://raw.githubusercontent.com/andyle83/marketplace/main/demo/2.png)

### TODO items

- Smart Contract Unit Test
- Frontend improvement:
  - Using frontend library / or framework (React)
  - CSS library (Tailwind + DaisyUI)
  - Unit Testing
- CI/CD
  - Integration Testing
  - CI/CD Pipeline
- New features
  - Voting / Comment from customer
  - Sorting / Pagination / Category
  - Searching
  - Multi-items checkout
  - Buying history
  - Recommendation (or any Personalization)
- Backend 
  - Using database to improve performance / or store "big" data like images
  - Extra customer profile (email, phone). It helps customer engagement / personalization
  - Administration features
    - Not everyone can add new product / category (admin, group of admin)
    - Selling reporting etc..

### Useful commands

- Celo-cli
  - New account: `celocli account:new`
  - Check configure: `celocli config:get`
  - Set configure (for network): `celocli config:set --node=https://alfajores-forno.celo-testnet.org`
  - Get balance (sample address): `celocli account:balance 0x8c5e4A133aA48d0B776D24DD6eA8315Ae4eE0bb8`
- Hardhat 
  - Deploy `npx hardhat run scripts/sample-script.js --network alfajores`

**Reference**

- [Celo Development 101](https://dacade.org/)
- [The Ultimate Guide to Deploy Celo dApps using Hardhat](https://medium.com/celodevelopers/hardhat-and-celo-the-ultimate-guide-to-deploy-celo-dapps-using-hardhat-747f42ad0788)
