import { CONFIG } from "./config.js";

const { ethereum } = window;
const { ethers } = window;

let provider;
let signer;
let contract;
let userAddress;
const location = window.location.pathname;

const connectButton = document.querySelector(".wallet-btn");

const personalArea = async () => {
  if (!location.includes("personal-area") || !contract || !userAddress) {
    return;
  }

  const refBalanceNode = document.querySelector(
    ".ref-received__right--balance",
  );
  const refCountNode = document.querySelector(
    ".ref-received__left--referrals-count",
  );
  const withdrawBtn = document.querySelector(".ref-link__btn");
  const refLinkInput = document.querySelector(".ref-link__value");
  const buyTicketsBtn = document.querySelector(".tickets__btn");
  const countOfTicketsNode = document.querySelector(".tickets__count");

  const refBalance = await contract.checkRefferalBalance(userAddress);
  const refBalanceParsed = ethers.utils.formatEther(refBalance);
  const referrals = await contract.checkRefferals(userAddress);
  const countOfReferrals =
    referrals[0].length + referrals[1].length + referrals[2].length;
  const userInfo = await contract.UserInfo(userAddress);

  refBalanceNode.textContent = `${refBalanceParsed} BNB`;
  refCountNode.textContent = `${countOfReferrals} links`;
  countOfTicketsNode.textContent = `${userInfo[0]} pieces`;

  withdrawBtn.addEventListener("click", () => {
    contract.withdrawRefferalsIncome(refBalance);
  });
  buyTicketsBtn.addEventListener("click", async () => {
    // const res = await contract.buyTickets(1);
    const res = await contract.setLottery(Date.now(), Date.now() + 1000000);
    console.log(res);
  });

  refLinkInput.value = `RoyalLottery.io?ref=${userAddress}`;
};

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
      const query = new URLSearchParams(window.location.search);

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

      personalArea();

      const isAccountRegistered = await contract.checkRegistration(userAddress);

      if (!isAccountRegistered) {
        const flatSig = await signer.signMessage(CONFIG.messageToSign);

        const signature = await ethers.utils.splitSignature(flatSig);

        await contract.VerifyMessage(
          ethers.utils.formatBytes32String(CONFIG.messageToSign),
          signature.v,
          signature.r,
          signature.s,
        );

        await contract.accountRegistration(query.get("ref"));
      }
    }
  } catch (e) {
    console.log(e);
  }
};

connectButton.addEventListener("click", () => connectMetamask());

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
