import { CONFIG } from "./config.js";

const { ethereum } = window;
const { ethers } = window;

let provider;
let signer;
let contract;
let userAddress;
const location = window.location.pathname;

const connectButton = document.querySelector(".wallet-btn");

const connectMetamask = async (prevAccount) => {
  try {
    if (userAddress && !prevAccount) {
      return;
    }

    if (ethereum) {
      connectButton.disabled = true;
      connectButton.classList.add("disabled");

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
      connectButton.disabled = false;
      connectButton.classList.remove("disabled");
      localStorage.setItem("accountConnected", userAddress);
      console.log(prevAccount, userAddress);

      if (prevAccount && userAddress === prevAccount) {
        return;
      }

      const message = await contract.getMessageHash(
        CONFIG.address,
        ethers.utils.hexlify(0),
        CONFIG.messageToSign,
        ethers.utils.hexlify(+(Math.random() * 100).toFixed(0)),
      );
      console.log(message);

      const signature = await signer.signMessage(CONFIG.messageToSign);
      console.log(signature);

      // const isAccountRegistered = await contract.validateAuthSignature(
      //   userAddress,
      //   CONFIG.address,
      //   0,
      //   CONFIG.messageToSign,
      //   +(Math.random() * 100).toFixed(0),
      //   signature,
      // );
      // console.log(isAccountRegistered);
    }
  } catch (e) {
    console.log(e);
  }
};

connectButton.addEventListener("click", connectMetamask);

console.log(window.location.pathname);

const accountConnected = localStorage.getItem("accountConnected");

if (accountConnected && ethereum) {
  connectMetamask(accountConnected);
}

ethereum.on("accountsChanged", (accounts) => {
  const prevAccount = localStorage.getItem("accountConnected");
  console.log(prevAccount, accounts[0]);

  if (prevAccount !== accounts[0]) {
    connectMetamask(prevAccount);
  }
});

if (location.includes("personal-area")) {
}
