import {Marketplace} from "../typechain-types";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  let contract: Marketplace;

  type Product = {
    address?: string,
    name: string,
    image: string,
    description: string,
    location: string,
    price: number,
    sold: number,
  }

  // arrange
  const products: Product[] = [
    {
      name: "Test 1",
      image: "Image 1",
      description: "Description 1",
      location: "Location 1",
      price: 1000,
      sold: 0
    },
    {
      name: "Test 2",
      image: "Image 2",
      description: "Description 2",
      location: "Location 2",
      price: 2000,
      sold: 0
    }
  ];

  beforeEach(async () => {
    // arrange
    const Marketplace = await ethers.getContractFactory("Marketplace");
    contract = await Marketplace.deploy();
    await contract.deployed();
    console.log("Marketplace deployed to:", contract.address);
  });

  describe("productsLength", () => {

    it("Should return no product when contract is deployed", async function () {
      // act
      const productsLength = await contract.getProductsLength();

      // assert
      expect(productsLength).to.be.not.undefined;
      expect(productsLength).to.be.not.null;
      expect(productsLength).to.equal(0);
    });

    it("Should return correct number of product when new products are insert", async function () {
      // act
      console.log(products.length);
      await Promise.all(products.map(async (product) => {
        const newProductTx = await contract.writeProduct(product.name, product.image, product.description, product.location, product.price);
        await newProductTx.wait();
      }));

      const productsLength = await contract.getProductsLength();

      // assert
      expect(productsLength).to.be.not.undefined;
      expect(productsLength).to.be.not.null;
      expect(productsLength).to.equal(2);
    });

  });

  describe("readProduct", () => {

    it("Should return correct product when a new product is insert", async function () {
      // act
      const newProductTx = await contract.writeProduct(
        products[0].name,
        products[0].image,
        products[0].description,
        products[0].location,
        products[0].price
      );
      // wait until the transaction is mined
      await newProductTx.wait();

      const [,name, image, description, location, price, sold] = await contract.readProduct(0);

      expect(name).to.equal(products[0].name);
      expect(image).to.equal(products[0].image);
      expect(description).to.equal(products[0].description);
      expect(location).to.equal(products[0].location);
      expect(price).to.equal(products[0].price);
      expect(sold).to.equal(products[0].sold);
    });

  })

});
