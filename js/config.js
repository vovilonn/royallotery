import { CONTRACT_ABI } from "./abi.js";

export const CONFIG = {
  chainId: 80001,
  address: "0x16773beCE0Ba23bF189f58eb9f15Ce2a3490f3DB",
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