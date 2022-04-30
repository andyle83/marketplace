const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Marketplace", function () {
  it("Should get no product when contract is deployed", async function () {
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();

    console.log("Marketplace deployed to:", marketplace.address);

    expect(await marketplace.getProductsLength()).to.equal(0);

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    //
    // // wait until the transaction is mined
    // await setGreetingTx.wait();
    //
    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
