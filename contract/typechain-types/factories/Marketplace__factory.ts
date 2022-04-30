/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Marketplace, MarketplaceInterface } from "../Marketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "buyProduct",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getProductsLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "readProduct",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_location",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "writeProduct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405273874069fa1eb16d44d622f2e0ca25eea172369bc16000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060015534801561006957600080fd5b50610ddb806100796000396000f3fe60806040526004361061003f5760003560e01c80631155dfe5146100445780638642269e1461006f5780638da8f27b1461008b578063fffa7e2e146100b4575b600080fd5b34801561005057600080fd5b506100596100f7565b6040516100669190610aa5565b60405180910390f35b61008960048036038101906100849190610902565b610101565b005b34801561009757600080fd5b506100b260048036038101906100ad919061082b565b61026a565b005b3480156100c057600080fd5b506100db60048036038101906100d69190610902565b6103bc565b6040516100ee97969594939291906109c3565b60405180910390f35b6000600154905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd336002600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660026000868152602001908152602001600020600501546040518463ffffffff1660e01b81526004016101aa93929190610a4e565b602060405180830381600087803b1580156101c457600080fd5b505af11580156101d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101fc9190610802565b61023b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023290610a85565b60405180910390fd5b60026000828152602001908152602001600020600601600081548092919061026290610c67565b919050555050565b60006040518060e001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018781526020018681526020018581526020018481526020018381526020018281525060026000600154815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101908051906020019061032d9291906106cd565b50604082015181600201908051906020019061034a9291906106cd565b5060608201518160030190805190602001906103679291906106cd565b5060808201518160040190805190602001906103849291906106cd565b5060a0820151816005015560c08201518160060155905050600160008154809291906103af90610c67565b9190505550505050505050565b60006060806060806000806002600089815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260008a8152602001908152602001600020600101600260008b8152602001908152602001600020600201600260008c8152602001908152602001600020600301600260008d8152602001908152602001600020600401600260008e815260200190815260200160002060050154600260008f81526020019081526020016000206006015485805461049090610c04565b80601f01602080910402602001604051908101604052809291908181526020018280546104bc90610c04565b80156105095780601f106104de57610100808354040283529160200191610509565b820191906000526020600020905b8154815290600101906020018083116104ec57829003601f168201915b5050505050955084805461051c90610c04565b80601f016020809104026020016040519081016040528092919081815260200182805461054890610c04565b80156105955780601f1061056a57610100808354040283529160200191610595565b820191906000526020600020905b81548152906001019060200180831161057857829003601f168201915b505050505094508380546105a890610c04565b80601f01602080910402602001604051908101604052809291908181526020018280546105d490610c04565b80156106215780601f106105f657610100808354040283529160200191610621565b820191906000526020600020905b81548152906001019060200180831161060457829003601f168201915b5050505050935082805461063490610c04565b80601f016020809104026020016040519081016040528092919081815260200182805461066090610c04565b80156106ad5780601f10610682576101008083540402835291602001916106ad565b820191906000526020600020905b81548152906001019060200180831161069057829003601f168201915b505050505092509650965096509650965096509650919395979092949650565b8280546106d990610c04565b90600052602060002090601f0160209004810192826106fb5760008555610742565b82601f1061071457805160ff1916838001178555610742565b82800160010185558215610742579182015b82811115610741578251825591602001919060010190610726565b5b50905061074f9190610753565b5090565b5b8082111561076c576000816000905550600101610754565b5090565b600061078361077e84610ae5565b610ac0565b90508281526020810184848401111561079b57600080fd5b6107a6848285610bc2565b509392505050565b6000815190506107bd81610d77565b92915050565b600082601f8301126107d457600080fd5b81356107e4848260208601610770565b91505092915050565b6000813590506107fc81610d8e565b92915050565b60006020828403121561081457600080fd5b6000610822848285016107ae565b91505092915050565b600080600080600060a0868803121561084357600080fd5b600086013567ffffffffffffffff81111561085d57600080fd5b610869888289016107c3565b955050602086013567ffffffffffffffff81111561088657600080fd5b610892888289016107c3565b945050604086013567ffffffffffffffff8111156108af57600080fd5b6108bb888289016107c3565b935050606086013567ffffffffffffffff8111156108d857600080fd5b6108e4888289016107c3565b92505060806108f5888289016107ed565b9150509295509295909350565b60006020828403121561091457600080fd5b6000610922848285016107ed565b91505092915050565b61093481610b8c565b82525050565b61094381610b44565b82525050565b61095281610b32565b82525050565b600061096382610b16565b61096d8185610b21565b935061097d818560208601610bd1565b61098681610d3d565b840191505092915050565b600061099e600f83610b21565b91506109a982610d4e565b602082019050919050565b6109bd81610b82565b82525050565b600060e0820190506109d8600083018a61093a565b81810360208301526109ea8189610958565b905081810360408301526109fe8188610958565b90508181036060830152610a128187610958565b90508181036080830152610a268186610958565b9050610a3560a08301856109b4565b610a4260c08301846109b4565b98975050505050505050565b6000606082019050610a636000830186610949565b610a70602083018561092b565b610a7d60408301846109b4565b949350505050565b60006020820190508181036000830152610a9e81610991565b9050919050565b6000602082019050610aba60008301846109b4565b92915050565b6000610aca610adb565b9050610ad68282610c36565b919050565b6000604051905090565b600067ffffffffffffffff821115610b0057610aff610d0e565b5b610b0982610d3d565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000610b3d82610b62565b9050919050565b6000610b4f82610b62565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610b9782610b9e565b9050919050565b6000610ba982610bb0565b9050919050565b6000610bbb82610b62565b9050919050565b82818337600083830152505050565b60005b83811015610bef578082015181840152602081019050610bd4565b83811115610bfe576000848401525b50505050565b60006002820490506001821680610c1c57607f821691505b60208210811415610c3057610c2f610cdf565b5b50919050565b610c3f82610d3d565b810181811067ffffffffffffffff82111715610c5e57610c5d610d0e565b5b80604052505050565b6000610c7282610b82565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610ca557610ca4610cb0565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f5472616e73666572206661696c65640000000000000000000000000000000000600082015250565b610d8081610b56565b8114610d8b57600080fd5b50565b610d9781610b82565b8114610da257600080fd5b5056fea2646970667358221220fc6e172cab27fca3fbc732d82407f2d2b63f7e69135745b8adae6fa19b7a969764736f6c63430008040033";

type MarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Marketplace__factory extends ContractFactory {
  constructor(...args: MarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Marketplace> {
    return super.deploy(overrides || {}) as Promise<Marketplace>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Marketplace {
    return super.attach(address) as Marketplace;
  }
  override connect(signer: Signer): Marketplace__factory {
    return super.connect(signer) as Marketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketplaceInterface {
    return new utils.Interface(_abi) as MarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Marketplace {
    return new Contract(address, _abi, signerOrProvider) as Marketplace;
  }
}