const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Marketplace", function () {
  let contract;

  beforeEach(async () => {
    const Marketplace = await ethers.getContractFactory("Marketplace");
    contract = await Marketplace.deploy();
  });

  it("Should get no product when contract is deployed", async function () {
    await contract.deployed();
    console.log("Marketplace deployed to:", contract.address);

    const productsLength = await contract.getProductsLength();
    expect(productsLength).to.equal(0);

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    //
    // // wait until the transaction is mined
    // await setGreetingTx.wait();
    //
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
