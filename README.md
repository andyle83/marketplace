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
- Deploy address: `0xF377516621Cef90E12C0b5133adc783A336B1123`

Frontend:
- Nodejs application 
- [Webpack](https://webpack.js.org/guides/getting-started/) as module bundler
- Utilise [Celo ContractKit](https://docs.celo.org/developer-guide/contractkit/setup)
- Using jQuery to update UI component with simple even handler function

Screenshot:

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

**Reference**

- https://dacade.org/
