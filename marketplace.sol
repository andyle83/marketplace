// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

contract Marketplace {  

    struct Product {
        address payable owner;
        string name;
        string image;
        string description;
        string location;
        uint price;
        uint sold;
    }

    // keep track how many products
    uint internal productsLength = 0;

    mapping(uint => Product) internal products;

    function writeProduct( 
        string memory _name,
        string memory _image,
        string memory _description,
        string memory _location,
        uint _price
    ) public {
        uint _sold = 0;

        products[productsLength] = Product(
            payable(msg.sender),
            _name,
            _image,
            _description,
            _location,
            _price,
            _sold
        );

        // increase whenever we have a new product added
        productsLength++;
    }

    function getProductsLength() public view returns (uint) {
        return productsLength;
    }

    function readProduct(uint _index) public view returns (
        address payable,
        string memory,
        string memory,
        string memory,
        string memory,
        uint,
        uint
    ) {
        return (
            products[_index].owner,
            products[_index].name,
            products[_index].image,
            products[_index].description,
            products[_index].location,
            products[_index].price,
            products[_index].sold
        );
    }
}