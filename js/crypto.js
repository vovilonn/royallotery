/* eslint-disable no-underscore-dangle */

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import {BigNumber} from "ethers";
import Web3 from "web3";
import {CONFIG, rpcUrl, addChainParams} from "./config.js";

let isMetaMaskProcessing;
const web3 = new Web3(window.ethereum);
const {ethereum} = window;
const {ethers} = window;
let isMetaMask;
let isMetaMaskEventAdded = false;
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
});

const customHttpProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
const modal = document.getElementById("myModal");
const readContract = new ethers.Contract(CONFIG.address, CONFIG.abi, customHttpProvider);
class ContractService {

  static _walletProvider;

  static _provider;

  static _signer;

  static get provider() {

    if (this._provider) {
      return this._provider;
    }
    if (!ethereum) {
      this._provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    } else {
      this._provider = new ethers.providers.Web3Provider(ethereum, 'any');
    }
    return this._provider;
  }

  static get contract() {
    if (!ethereum) {
      return null;
    }
    if (this._contract) {
      return this._contract;
    }
    this._provider = this.provider
    this._signer = this._provider.getSigner();
    this._contract = new ethers.Contract(CONFIG.address, CONFIG.abi, this._signer);
    return this._contract;
  }

  static get signer() {

    if (this._signer) {
      return this._signer;
    }
    this._provider = this.provider;
    this._signer = this._provider.getSigner();
    this._contract = new ethers.Contract(CONFIG.address, CONFIG.abi, this._signer);
    return this._signer;
  }

}


let userAddress;

const performOperation = async (functionName, ...dataToSend) => {
  if (isMetaMask) {
    const {contract} = ContractService;
    return contract[functionName](...dataToSend);
  }
  const abi = CONFIG.abi.find(el => el.name === functionName);
  let value;
  if (dataToSend[dataToSend.length - 1] && dataToSend[dataToSend.length - 1].value) {
    value = BigNumber.from(dataToSend[dataToSend.length - 1].value).toHexString();
    dataToSend.length -= 1;
  }
  const {provider} = ContractService;
  const nonce = await provider.getTransactionCount(userAddress, "pending");
  const data = web3.eth.abi.encodeFunctionCall(abi, [...dataToSend]);
  const sendTransactionObj = {
    from: userAddress,
    to: CONFIG.address,
    nonce,
    // value: "0x00",
    data,
  };
  if (value) {
    sendTransactionObj.value = value;
  }
  return connector.sendTransaction(sendTransactionObj);
}
const location = window.location.pathname;

const connectButton = document.querySelector(".wallet-btn");


const ticketTemplate = ({ticketId}) => `<li class="tickets__item" data-status="win">
<div class="tickets__item-id">
    Ticket
    <span>№${ticketId}</span>
</div>

</li>`

const getUserTickets = async () => {
  try {
    if (!(localStorage.getItem('accountConnected') || localStorage.getItem('walletconnect'))) {
      return
    }
    const activeLottery = await readContract.checkActiveLottery();
    const tickets = activeLottery[0] ? await readContract.checkTicketIDs(userAddress, activeLottery[0]) : [];
    const ticketList = document.querySelector('.tickets__list');
    if (ticketList) {
      ticketList.innerHTML = '';
      // eslint-disable-next-line no-return-assign
      tickets.forEach(ticketId => ticketList.innerHTML += ticketTemplate({ticketId}));
    }
    const ticketIdEl = document.querySelector('.ticket__id');
    if (ticketIdEl) {
      ticketIdEl.innerHTML = activeLottery[0] ? `<b>ID</b> ${activeLottery[0]}</p>` : "No active lottery";
    }

    const ticketsToIncreaseChance = await readContract.checkIncreaseChances(userAddress);
    const ticketsToIncreaseChanceEl = document.querySelector('.ticketsToIncreaseChance');
    if (ticketsToIncreaseChanceEl) {
      ticketsToIncreaseChanceEl.innerHTML = ticketsToIncreaseChance === 1 ? `${ticketsToIncreaseChance} ` : ` ${ticketsToIncreaseChance} `;
    }

    const countOfTicketsNode = document.querySelector(".tickets__count");
    if (countOfTicketsNode) {
      countOfTicketsNode.innerHTML = tickets.length === 1 ? `${tickets.length} ` : `${tickets.length} `;
    }
  } catch (e) {
    console.log(e);
  }

}

const personalArea = async () => {

  if (!location.includes("personal-area") || !userAddress) {
    return;
  }

  const winBalanceNode = document.querySelector(
    ".winned-ballance",
  );
  const refBalanceNode = document.querySelector(
    ".ref-received__right--balance",
  );
  const refCountNode = document.querySelector(
    ".ref-received__left--referrals-count",
  );
  const withdrawBtn = document.querySelector(".ref-link__btn");
  const winnedWithdrawBtn = document.querySelector(".win-link__btn");
  const refLinkInput = document.querySelector(".ref-link__value");
  const buyTicketsBtn = document.querySelector(".tickets__btn");


  const refBalance = await readContract.checkRefferalBalance(userAddress);
  const refBalanceParsed = ethers.utils.formatEther(refBalance);
  const referrals = await readContract.checkRefferals(userAddress);
  const countOfReferrals =
    referrals[0].length + referrals[1].length + referrals[2].length;
  refBalanceNode.textContent = `${refBalanceParsed} BNB`;
  refCountNode.textContent = `${countOfReferrals}`;
  const userInfo = await readContract.UserInfo(userAddress);
  const balance = ethers.utils.formatEther(userInfo.balance);
  winBalanceNode.textContent = `${balance} BNB`;
  winnedWithdrawBtn.addEventListener("click", () => {
    try {
      winnedWithdrawBtn.disabled = true;
      winnedWithdrawBtn.classList.add("disabled");
      performOperation('withdraw');
    } catch (err) {
      console.log(err);
    } finally {
      winnedWithdrawBtn.disabled = false;
      winnedWithdrawBtn.classList.remove("disabled");
    }
  })
  withdrawBtn.addEventListener("click", async () => {
    try {
      withdrawBtn.disabled = true;
      withdrawBtn.classList.add("disabled");
      await performOperation('withdrawRefferalsIncome');
      alert('Amount will be send when transaction succed');
    } catch (err) {
      console.log(err);
    } finally {
      withdrawBtn.disabled = false;
      withdrawBtn.classList.remove("disabled");
    }
  });
  buyTicketsBtn.addEventListener("click", async () => {
    try {
      buyTicketsBtn.disabled = true;
      buyTicketsBtn.classList.add("disabled");

      const activeLottery = await readContract.checkActiveLottery();
      const price = await readContract.ticketPrice();
      const ticketsAmount = document.querySelector('#ticketsCounter').value;
      if (ticketsAmount > 0) {
        await performOperation('buyTickets', ticketsAmount, activeLottery[0], {value: price.mul(ticketsAmount)});
        alert('Ticket(s) will be added to list when transaction succed');
      }
    } catch (err) {
      console.log(err);
    } finally {
      buyTicketsBtn.disabled = false;
      buyTicketsBtn.classList.remove("disabled");
    }


  });

  refLinkInput.value = `https://royallottery.io?ref=${userAddress}`;
};

const improvementBtn = document.querySelector(".improvement-btn");

improvementBtn?.addEventListener('click', async (event) => {
  const activeLottery = await readContract.checkActiveLottery();
  const ticketsToIncreaseChance = await readContract.checkIncreaseChances(userAddress);
  if (activeLottery.length && ticketsToIncreaseChance) {
    await performOperation('increaseChance', ticketsToIncreaseChance, activeLottery[0]);
  }

})

const connectMetamask = async (prevAccount) => {
  if (isMetaMaskProcessing) {
    return;
  }
  try {
    isMetaMaskProcessing = true;
    const {contract, signer} = ContractService;
    if (userAddress && !prevAccount && !(connector.connected || contract)) {
      return;
    }
    connectButton.disabled = true;
    connectButton.classList.add("disabled");
    if (connector.connected) {
      isMetaMask = false;
      userAddress = connector.accounts[0];

      try {
        const customRequest = {
          jsonrpc: "2.0",
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: addChainParams.params[0].chainId,
            },
          ],
        };
        connector.sendCustomRequest(customRequest);
      } catch (e) {
        if (e.message !== 'User rejected the request.') {
          const customRequest = {
            jsonrpc: "2.0",
            ...addChainParams
          };
          await connector.sendCustomRequest(customRequest);
        } else {
          throw e;
        }
      }
    } else if (ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{chainId: addChainParams.params[0].chainId}],
        });
      } catch (err) {
        if (err.message !== 'User rejected the request.') {
          ethereum.request(addChainParams);
        } else {
          throw err;
        }
      }
      isMetaMask = true;

    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const [currentAddress] = accounts;
    userAddress = currentAddress;
    const query = new URLSearchParams(window.location.search);

    connectButton.disabled = false;
    connectButton.classList.remove("disabled");

    const getStartedBtns = document.querySelectorAll('[data-i18n="main.getStarted"]');
    getStartedBtns.forEach(btn => btn.setAttribute('data-i18n', 'main.personalArea'))
    localStorage.setItem("accountConnected", userAddress);
    await personalArea();

    const isAccountRegistered = await readContract.checkRegistration(userAddress);


    if (!isAccountRegistered) {
      let flatSig
      if (isMetaMask) {
        flatSig = await signer.signMessage(CONFIG.messageToSign);
      } else {
        flatSig = await connector.signPersonalMessage([`${CONFIG.messageToSign} ${new Date().getTime()}`, userAddress]);
      }

      const signature = await ethers.utils.splitSignature(flatSig);
      await readContract.VerifyMessage(
        ethers.utils.formatBytes32String(CONFIG.messageToSign),
        signature.v,
        signature.r,
        signature.s,
      );
      await performOperation('accountRegistration', query.get("ref") || "0x0000000000000000000000000000000000000000");
    }
    const lang = localStorage.getItem('i18nextLng');
    let connected = 'Connected';
    if (lang === 'ru') {
      connected = 'Подключен';
    }
    if (window.location.pathname === '/personal-area.html') {
      connectButton.textContent = `${connected} ${userAddress.slice(
        0,
        5,
      )}...${userAddress.slice(userAddress.length - 3)}`;
    } else {
      let area = 'Personal area';
      if (lang === 'ru') {
        area = 'Личный кабинет';
        connectButton.addEventListener('click', () => {
          window.location.pathname = '/personal-area.html'
        })
      }
      connectButton.textContent = area;
    }

  } catch (e) {
    localStorage.removeItem('accountConnected')
    console.log(e);
  } finally {
    isMetaMaskProcessing = false;
    connectButton.disabled = false;
    connectButton.classList.remove("disabled");
    modal.style.display = "none";
    isMetaMaskEventAdded = true;
    (ethereum && !isMetaMaskEventAdded) && ethereum.on("accountsChanged", async (accounts) => {
      try {
        const prevAccount = localStorage.getItem("accountConnected");
        if ((prevAccount != accounts[0]) && !isMetaMaskProcessing) {
          await connectMetamask(prevAccount);
          await getUserTickets();
        }
      } catch (err) {
        localStorage.removeItem('accountConnected')
      }

    });

  }
};


// Get the modal

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
if (span) {
  span.onclick = function () {
    modal.style.display = "none";
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

connectButton.addEventListener("click", () => {
  if (!userAddress) {
    modal.style.display = "block";
  }
});
const metamaskButton = document.querySelector(".connect-metamask");
metamaskButton.addEventListener("click", () => connectMetamask());

const walletButton = document.querySelector(".connect-wallet");
walletButton.addEventListener("click", async () => {

  try {
    if (!connector.connected) {
      await connector.createSession();
    }

  } catch (err) {
    console.log(err);
  }
});


const accountConnected = localStorage.getItem("accountConnected");

(async () => {
  if ((localStorage.getItem('walletconnect') || accountConnected)) {
    try {
      await connectMetamask(accountConnected);
      await getUserTickets();
    } catch (e) {
      localStorage.removeItem('accountConnected')
      console.log(e);
    }
  }
})();


connector && connector.on("connect", async (error, payload) => {
  modal.style.display = "none";
  await connectMetamask();
  await getUserTickets();
  if (error) {
    console.log("connect", error)
  }
});

connector && connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }
});

const showMoreBtn = document.querySelector('.show-more-btn');
if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    document.querySelectorAll('.tickets__item').forEach(el => el.classList.add('visible'));
    showMoreBtn.style.display = 'none';
  });
}
