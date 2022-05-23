// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

// Interface of an ERC-20 token so this contract can interact with it
interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Marketplace {  

    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    event newProduct(string name, address _seller, uint _price);

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
        // 0: is available, 1: is sold - not available
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

        // emit event to update UI
        emit newProduct(_name, msg.sender, _price);
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

    // buy a product from our contract
    function buyProduct(uint _index) public payable {
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                products[_index].owner,
                products[_index].price
            ),
            "Transfer failed"
        );

        products[_index].sold++;
    }
}