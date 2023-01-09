
import {CONFIG, rpcUrl} from "./config.js";

const {ethers} = window;

$(document).ready(async () => {
    const inputEl = $('#ticketsCounter');

    const customHttpProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const readContract = new ethers.Contract(CONFIG.address, CONFIG.abi, customHttpProvider);
    let ticketPrice = await readContract.ticketPrice();
    ticketPrice = +ethers.utils.formatEther(ticketPrice);
    const ticketsCostEl = document.querySelector('.tickets_cost');
    ticketsCostEl.innerHTML = `${Math.round(ticketPrice * 1 * 1000) / 1000} BNB`;
    $('.minus').click(() => {
        let count = parseInt(inputEl.val(), 10) - 1;
        count = count < 1 ? 1 : count;
        inputEl.val(count);
        ticketsCostEl.innerHTML = `${Math.round(ticketPrice * count * 1000) / 1000} BNB`;
        inputEl.change();
        return false;
    });
    $('.plus').click(() => {
        const count = parseInt(inputEl.val(), 10) + 1;
        inputEl.val(count);
        ticketsCostEl.innerHTML = `${Math.round(ticketPrice * count * 1000) / 1000} BNB`;
        inputEl.change();
        return false;
    });
    inputEl.change((e) => {
        const {value} = e.target

        if (value <= 0 || Number.isNaN(parseInt(value, 10))) {
            inputEl.val(1);
            ticketsCostEl.innerHTML = `${Math.round(ticketPrice * 1 * 1000) / 1000} BNB`;
        } else {
            ticketsCostEl.innerHTML = `${Math.round(ticketPrice * value * 1000) / 1000} BNB`;
        }
    })
});