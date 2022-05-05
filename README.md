## Celo 101 - Marketplace

### 1. Introduce

This project implements a simple marketplace to manage / selling product. It's based on great course of Celo in the decade.org. It helps us to understand about Solidity, Celo blockchain, and how to make a fullstack application.

The feature includes:

- See products hosted on the Celo Blockchain
- Purchase products with cUSD and pay the owner
- Add your own products to the dApp

**Demo website**: https://andyle83.github.io/marketplace/

### 2. Technology:

**Blockchain:**

- Written in Solidity for Celo blockchain network
- Deploying in Celo testnet: https://alfajores-blockscout.celo-testnet.org/
- Deploy address: `0x052F92eF1B97c0dD68B7150a8BBeBf962dD8a4e7` (can be changed)
- Development framework: HardHat & Laika

**Frontend:**

There are two variant of implementation:

- Node.js application (`app` folder)
  - [Webpack](https://webpack.js.org/guides/getting-started/) as module bundler
  - Utilise [Celo ContractKit](https://docs.celo.org/developer-guide/contractkit/setup)
  - Using jQuery to update UI component with simple even handler function
  - Bootstrap UI framework

- Next.js framework (`react-app` folder)
  - Using `use-contractkit` library
  - Apollo Client for GraphQL queries
  - Bootstrap UI framework

### 3. Testing

**Running Unit Testing Smart Contract**

- Local network - Testing using hardhat gauche package: `npm run test`
- Local network - Testing using hardhat node: `npx hardhat node` , then `npx hardhat test`
- Testing network:  `npx hardhat test --network alfajores`

**Running manual test (using Laika)**
  
- Deploy in testnet: `npx hardhat run scripts/sample-script.js --network alfajores`
- Sync: `npx hardhat laika-sync --contract Marketplace --address 0x052F92eF1B97c0dD68B7150a8BBeBf962dD8a4e7`

### 4. Application screenshot

Home Page

![Home Page](https://raw.githubusercontent.com/andyle83/marketplace/main/demo/1.png)

Add New Product

![Add New Product](https://raw.githubusercontent.com/andyle83/marketplace/main/demo/2.png)

### 5. TODO

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

### 6. Useful commands

**Celo-cli**

- New account: `celocli account:new`
- Check configure: `celocli config:get`
- Set configure (for network): `celocli config:set --node=https://alfajores-forno.celo-testnet.org`
- Get balance (sample address): `celocli account:balance 0xbDEA9f367e9a92b41e91525AEC13d3aDFb027a68`

**Hardhat**

- Console: `npx hardhat console` (i.e., config)
- Accounts: `npx hardhat accounts`
- Clean up: ` npx hardhat clean`
- Compile: `npx hardhat compile`
- In-memory network: `npx hardhat node`
- Testing: `npx hardhat test` | `npx hardhat test --network alfajores`
- Deploy: `npx hardhat run scripts/sample-script.js --network alfajores`
- Laika (similar as Postman)
- Syn command: `npx hardhat laika-sync --contract Marketplace --address 0x052F92eF1B97c0dD68B7150a8BBeBf962dD8a4e7`

### 7. Issues

1. Not able to run in localhost. Solution
  - Start the hardhat node as in-memory local blockchain
  - Update hardhat configure with right address (localhost) and port

2. Trying to insert concurrent (multi products) at the same time in Testnet, and get an issue
```
Error: replacement fee too low [ See: https://links.ethers.org/v5-errors-REPLACEMENT_UNDERPRICED 
```

3. Trying to make unit test for `buyProduct` but transaction was reverted with error:
```
ProviderError: VM Exception while processing transaction: revert
```
- Running hardhat in-memory blockchain `npx hardhat node`
- Running unit test in hardhat node `npx hardhat test --network localhost`
- Checking output in hardhat console log

```
eth_chainId
eth_getTransactionByHash
eth_chainId
eth_getTransactionReceipt
eth_chainId
eth_estimateGas
  Contract call:       Marketplace#buyProduct
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  To:                  0x0165878a594ca255338adfa4d48449f69242eb8f
  Value:               0 ETH

  Error: Transaction reverted: function call to a non-contract account
      at Marketplace.buyProduct (contracts/Marketplace.sol:88)
      at async EthModule._estimateGasAction (/Users/Anh.Le/Workspace/GitHub/celo-101/contract/node_modules/hardhat/src/internal/hardhat-network/provider/modules/eth.ts:425:7)
      at async HardhatNetworkProvider._sendWithLogging (/Users/Anh.Le/Workspace/GitHub/celo-101/contract/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:139:22)
      at async HardhatNetworkProvider.request (/Users/Anh.Le/Workspace/GitHub/celo-101/contract/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:116:18)
      at async JsonRpcHandler._handleRequest (/Users/Anh.Le/Workspace/GitHub/celo-101/contract/node_modules/hardhat/src/internal/hardhat-network/jsonrpc/handler.ts:188:20)
      at async JsonRpcHandler._handleSingleRequest (/Users/Anh.Le/Workspace/GitHub/celo-101/contract/node_modules/hardhat/src/internal/hardhat-network/jsonrpc/handler.ts:167:17)
      at async Server.JsonRpcHandler.handleHttp (/Users/Anh.Le/Workspace/GitHub/celo-101/contract/node_modules/hardhat/src/internal/hardhat-network/jsonrpc/handler.ts:52:21)
```

**Reference**

- [Celo Development 101](https://dacade.org/)
- [The Ultimate Guide to Deploy Celo dApps using Hardhat](https://medium.com/celodevelopers/hardhat-and-celo-the-ultimate-guide-to-deploy-celo-dapps-using-hardhat-747f42ad0788)
