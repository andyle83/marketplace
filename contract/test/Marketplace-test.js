const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Marketplace", function () {
  let contract;

  beforeEach(async () => {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    contract = await Marketplace.deploy();
    await contract.deployed();
    console.log("Marketplace deployed to:", contract.address);
  });

  describe("productsLength", () => {
    it("Should return no product when contract is deployed", async function () {
      // act
      const productsLength = await contract.getProductsLength();
      expect(productsLength).to.equal(0);
    });

    it("Should return 1 product when a new product is insert", async function () {
      // act
      await contract.writeProduct("Test", "Image", "Description", "Location", 100);
      const productsLength = await contract.getProductsLength();

      // assert
      expect(productsLength).to.equal(1);
    });
  })
});
