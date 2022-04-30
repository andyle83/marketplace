import {Marketplace} from "../typechain-types";

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  let contract: Marketplace;

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
      const newProductTx1 = await contract.writeProduct("Test 1", "Image 1", "Description 1", "Location 1", 1000);
      const newProductTx2 = await contract.writeProduct("Test 2", "Image 2", "Description 2", "Location 2", 2000);
      // wait until the transaction is mined
      await newProductTx1.wait();
      await newProductTx2.wait();

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
      const newProductTx = await contract.writeProduct("Test", "Image", "Description", "Location", 1000);
      // wait until the transaction is mined
      await newProductTx.wait();

      const [,name, image, description, location, price] = await contract.readProduct(0);

      // assert
      expect(name).to.equal("Test");
      expect(image).to.equal("Image");
      expect(description).to.equal("Description");
      expect(location).to.equal("Location");
      expect(price).to.equal("1000");
    });

  })

});
