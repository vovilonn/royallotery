import {Enlocales} from "./locales/en.js";
import {Rulocales} from "./locales/ru.js";

const lngs = {
    en: {nativeName: 'EN'},
    ru: {nativeName: 'RU'}
};

const connectedWallet = () => {
    let wallet = localStorage.getItem("accountConnected");
    if (wallet) {
        wallet = `${wallet.slice(
            0,
            5,
        )}...${wallet.slice(wallet.length - 3)}`;
        const connectButton = document.querySelector(".wallet-btn");
        if (window.location.pathname === '/personal-area.html') {
            connectButton.setAttribute("data-i18n", "main.connectedWallet");
        } else {
            connectButton.setAttribute("data-i18n", "main.personalArea");
            connectButton.addEventListener('click', () => {
                window.location.pathname = '/personal-area.html'
            })
        }

    }
    return wallet;
}

$(() => {
    i18next
        .use(i18nextBrowserLanguageDetector)
        .init({
            debug: true,
            fallbackLng: 'en',
            resources: {
                en: {
                    translation: Enlocales
                },
                ru: {
                    translation: Rulocales
                }
            }
        }, (err, t) => {
            const lang = localStorage.getItem('i18nextLng');

            if (err) return console.error(err);

            jqueryI18next.init(i18next, $, {useOptionsAttr: true});

            $('body').localize({wallet: connectedWallet()});

            Object.keys(lngs).map((lng) => {
                const li = document.createElement("li");
                li.className = 'languages__item'
                li.innerHTML = `  <a href="#">
                <img src='images/${lng}_icon.svg'/>
                <span>${lng.toUpperCase()}</span>
            </a>`
                $('#languageSwitcher').append(li);
                if (lang && lang === lng) {
                    document.querySelector('.languages_main_item').innerHTML = li.innerHTML;
                }
                li.addEventListener('click', (e) => {
                    i18next.changeLanguage(lng, () => {
                        $('body').localize({wallet: connectedWallet()});
                    });
                    document.querySelector('.languages_main_item').innerHTML = li.innerHTML;
                });
            });
        });
});

