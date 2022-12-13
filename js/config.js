import { CONTRACT_ABI } from "./abi.js";

export const CONFIG = {
  chainId: 80001,
  address: "0x415fD09EC7959f35A8Ba3318636475599DEfA42a",
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