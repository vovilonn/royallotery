import { CONTRACT_ABI } from "./abi.js";

export const CONFIG = {
  chainId: 56,
  address: "0x2ef044dC74Fc834d47BF99F117C287D756288381",
  abi: CONTRACT_ABI,
  messageToSign: "Authorization message",
};

export const rpcUrl = 'https://bsc-dataseed1.binance.org/';

export const addChainParams = {
  method: "wallet_addEthereumChain",
  params: [{
    chainId: '0x38',
    rpcUrls: [rpcUrl],
    chainName: "Smart Chain",
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com/"]
  }]
};