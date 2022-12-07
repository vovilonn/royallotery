import { CONTRACT_ABI } from "./abi.js";

export const CONFIG = {
  chainId: 80001,
  address: "0xA01eB9C0347305bd3993D4a881FB59759ab059c3",
  abi: CONTRACT_ABI,
  messageToSign: "Authorization message",
};

export const rpcUrl = 'https://matic-testnet-archive-rpc.bwarelabs.com';

export const addChainParams = {
  method: "wallet_addEthereumChain",
  params: [{
    chainId: '0x13881',
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    chainName: "Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
  }]
};

export const jackpotAddress = '0xE2A0B9b79ceE6A6BD7F09bA8CfE4A03E8f902010';