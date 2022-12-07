/* eslint-disable no-return-assign */
/* eslint-disable no-await-in-loop */


import {CONFIG, jackpotAddress, rpcUrl} from "./config.js";

const {ethers} = window;
const {ethereum} = window;

const customHttpProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
const readContract = new ethers.Contract(CONFIG.address, CONFIG.abi, customHttpProvider);

// Timer

const convertUrl = 'https://www.binance.com/api/v3/ticker/price?symbol=BNBUSDT';
let newDate = new Date("sep 12 23 23:59:59").getTime();


const leaderBoardItemTemplate = ({userId, amount}) => ` <li class="leaderboard__item">
<div class="leaderboard__id">
    ID <span>${userId}</span>

</div>

<div class="leaderboard__bnb">
    ${amount} Bnb
</div>
</li>`
const showWinners = async () => {
  const lotteriesInfo = [];
  let lotteryId = 1;
  let emptyLotteriesAmount = 0;
  let currentLottery = await readContract.checkWinners(lotteryId);;
  do {
    const currentLotteryInfo = await readContract.LotteryId(lotteryId);
    if (currentLottery.win1[0]) {
      lotteriesInfo.push({
        userId: `${currentLottery.win1[0].slice(0, 3)}***${currentLottery.win1[0].slice(-3)}`,
        amount: Math.round(+ethers.utils.formatEther(currentLotteryInfo.pot) / 10 * 1000) / 1000
      })
    }

    lotteryId += 1;
    currentLottery = await readContract.checkWinners(lotteryId);
    if (!currentLottery.win1.length) {
      emptyLotteriesAmount += 1;
    }
  } while (emptyLotteriesAmount < 2)

  lotteriesInfo.sort((a, b) => b.amount - a.amount);
  if (lotteriesInfo.length > 10) {
    lotteriesInfo.length = 10;
  }
  const leaderBoardLists = document.querySelectorAll('.leaderboard__list');
  leaderBoardLists[0].innerHTML = '';
  leaderBoardLists[1].innerHTML = '';
  lotteriesInfo.slice(0, 5).forEach(info => leaderBoardLists[0].innerHTML += leaderBoardItemTemplate(info));
  leaderBoardLists[1].innerHTML = '';
  lotteriesInfo.slice(5).forEach(info => leaderBoardLists[1].innerHTML += leaderBoardItemTemplate(info));
}

const showLotteryInfo = async () => {
  try {
    const activeLottery = await readContract.checkActiveLottery();
    const balance = await customHttpProvider.getBalance(jackpotAddress);

    const jackPotSum = document.querySelector('.jackpot__sum');
    if (jackPotSum) {
      jackPotSum.innerHTML = `${(+ethers.utils.formatEther(balance)).toFixed(2)} BNB`;
    }
    let resWithConversionRate = await fetch(convertUrl);
    resWithConversionRate = await resWithConversionRate.json();
    const jackPotSumUsd = document.querySelector('.jackpot__total__usd');

    if (jackPotSumUsd) {
      jackPotSumUsd.innerHTML = `$${(resWithConversionRate.price * ethers.utils.formatEther(balance)).toFixed(2)}`;
    }
    const countdownEl = document.querySelector('.countdown-jackPot');

    if (!activeLottery.length) {
      if (countdownEl) {
        countdownEl.setAttribute('data-i18n', 'main.youCanWin');
        countdownEl.innerHTML = "";
      }
    }

    if (activeLottery.length) {

      const ticketRoundNumberEl = document.querySelector('.round-number');
      if (ticketRoundNumberEl) {
        ticketRoundNumberEl.textContent = activeLottery[0];
      }
      const currentLotery = await readContract.LotteryId(activeLottery[0]);
      if (!currentLotery.jackPot) {
        if (countdownEl) {
          countdownEl.setAttribute('data-i18n', 'main.youCanWin');
          countdownEl.innerHTML = "";
        }
      }

      newDate = new Date(currentLotery.endTime * 1000).getTime();
      const countdown = setInterval(() => {
        const date = new Date().getTime();
        const diff = newDate - date;
        if (diff <= 1000) {
          clearInterval(countdown);
        }
        const days = Math.floor(
          (diff % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24),
        );
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.querySelectorAll(".timer").forEach((timer) => {
          if (timer.querySelector(".seconds")) {
            timer.querySelector(".seconds").innerHTML =
              seconds < 10 ? `0${seconds}` : seconds;
            timer.querySelector(".minutes").innerHTML =
              minutes < 10 ? `0${minutes}` : minutes;
            timer.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
            timer.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
          }
        });
      }, 1000);
    }
    $('body').localize();

  } catch (e) {
    // ignore
  } finally {
    try {
      await showWinners();

    } catch (er) {
      // ignore
    }
  }
}

showLotteryInfo();


// Leaderboard slider

const Leaderboard = document.querySelector(".leaderboard-slider");

if (Leaderboard) {
  // eslint-disable-next-line no-undef
  new Swiper(Leaderboard, {
    spaceBetween: 100,
    slidesPerView: 1,
    pagination: {
      el: ".leaderboard-pagination",
    },
    breakpoints: {
      971: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1071: {
        slidesPerView: 2,
        spaceBetween: 72,
      },
    },
  });
}

// DropDown

const languages = document.querySelector(".languages");

if (languages) {
  languages.addEventListener("click", () => {
    languages.classList.toggle("is-open");
  }, true);

  document.addEventListener("click", (e) => {
    if ( !document.querySelector(".languages_main_item").contains(e.target)) {
      languages.classList.remove("is-open");
    }
  });
}

// Copy referral link

const copyLinkBtn = document.querySelector(".copy-ref-btn");

const copyContent = async () => {
  const copyText = document.querySelector(".ref-link__value").value;

  try {
    await navigator.clipboard.writeText(copyText);
    copyLinkBtn.innerHTML = "Link copied";
    copyLinkBtn.classList.add("copied");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

if (copyLinkBtn) {
  copyLinkBtn.addEventListener("click", copyContent);
}

// Range

const rangeWrapper = document.querySelectorAll(".tickets__range");

document.addEventListener("click", (e) => {
  const {target} = e;
  const targetParent = target.parentElement;

  if (
    target.classList.contains("improvement-btn") ||
    target.classList.contains("tickets__range") ||
    targetParent.classList.contains("tickets__range")
  ) {
    const thisWindow = targetParent.querySelector(".tickets__range");

    rangeWrapper.forEach((window) => {
      if (window !== thisWindow) window.classList.remove("is-active");
    });
  } else {
    rangeWrapper.forEach((window) => window.classList.remove("is-active"));
  }
});

rangeWrapper.forEach((el) => {
  const range = el.querySelector(".range");
  const rangeValue = el.querySelector(".range-value");
  const rangePos = 0;

  const init = (value) => {
    rangeValue.innerHTML = `${value}%`;
    rangeValue.style.width = `${rangePos} = ${value}%`;
  };

  const updateValue = (value) => {
    rangeValue.innerHTML = `${Math.floor(value)}%`;

    if (value > 1) {
      el.parentNode.querySelector(
        ".improvement-btn",
      ).innerHTML = `+${value}% Improved Probability`;
      el.parentNode
        .querySelector(".improvement-btn")
        .classList.add("is-active");
    } else {
      el.parentNode.querySelector(".improvement-btn").innerHTML =
        "Apply improvement";
      el.parentNode
        .querySelector(".improvement-btn")
        .classList.remove("is-active");
    }
  };

  const updateVar = (value) => {
    el.querySelector(
      ".tickets__range-line",
    ).style.background = `linear-gradient(to right, #A289FC 0%, #A289FC ${value * 2
    }%, transparent ${value * 2}%, transparent 100%)`;
  };

  init(range.value);

  range.addEventListener("input", () => {
    updateVar(range.value);
    updateValue(range.value);
  });
});

// Accordion

const accordions = document.querySelectorAll(".faq__item");

const openAccordion = (accordion) => {
  const content = accordion.querySelector(".faq__body");
  accordion.classList.add("is-open");
  content.style.maxHeight = `${content.scrollHeight + 34}px`;
};

const closeAccordion = (accordion) => {
  const content = accordion.querySelector(".faq__body");
  accordion.classList.remove("is-open");
  content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
  const intro = accordion.querySelector(".faq__head");
  const content = accordion.querySelector(".faq__body");

  intro.onclick = () => {
    if (content.style.maxHeight) {
      closeAccordion(accordion);
    } else {
      accordions.forEach((item) => closeAccordion(item));
      openAccordion(accordion);
    }
  };
});
