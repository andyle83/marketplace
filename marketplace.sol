// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

contract Marketplace {  

    string public product = "Burger";  

    mapping(uint => string) internal products;

    function writeProduct(uint _index, string memory _product) public {
        products[_index] = _product;
    }

    function readProduct(uint _index) public view returns (string memory) {
        return products[_index];
    }
}