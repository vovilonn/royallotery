import { CONFIG } from "./config.js";

const { ethereum } = window;
const { ethers } = window;

let provider;
let signer;
let contract;
let userAddress;

const connectButton = document.querySelector(".wallet-btn");

const connectMetamask = async () => {
  try {
    if (ethereum) {
      connectButton.disabled = true;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      provider = new ethers.providers.Web3Provider(ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(CONFIG.address, CONFIG.abi, signer);
      const [currentAddress] = accounts;
      userAddress = currentAddress;

      connectButton.textContent = `Connected ${userAddress.slice(
        0,
        5,
      )}...${userAddress.slice(userAddress.length - 3)}`;
    }
  } catch (e) {
    console.log(e);
  }
};

connectButton.addEventListener("click", connectMetamask);
