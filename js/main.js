// Timer
const newDate = new Date('sep 12 23 23:59:59').getTime()

const countdown = setInterval(() => {

    const
        date = new Date().getTime(),
        diff = newDate - date,
        days = Math.floor(diff % (1000 * 60 * 60 * 24 * (365.25 / 12)) / (1000 * 60 * 60 * 24)),
        hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
        minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelectorAll('.timer').forEach(timer => {
        timer.querySelector(".seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds
        timer.querySelector(".minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes
        timer.querySelector(".hours").innerHTML = hours < 10 ? '0' + hours : hours
        timer.querySelector(".days").innerHTML = days < 10 ? '0' + days : days
    })

    if (diff === 0) {
        clearInterval(countdown)
        console.log('Event End')
    }

}, 1000)

// Leaderboard slider

const Leaderboard = document.querySelector('.leaderboard-slider')

if (Leaderboard) {
    const LeaderboardSwiper = new Swiper(Leaderboard, {
        spaceBetween: 72,
        slidesPerView: 2,
        pagination: {
            el: '.leaderboard-pagination',
        },
    });
}

// DropDown

const languages = document.querySelector('.languages')

if (languages) {
    languages.addEventListener('click', () => {
        languages.classList.toggle('is-open')
    })

    document.addEventListener('click', (e) => {

        if (e.target !== document.querySelector('.languages__item')) {
            languages.classList.remove('is-open')
        }

    })
}

// Copy referral link

const
    copyLinkBtn = document.querySelector('.copy-ref-btn'),
    copyText = document.querySelector('.ref-link__value').value

const copyContent = async () => {
    try {
        await navigator.clipboard.writeText(copyText);
        copyLinkBtn.innerHTML = 'Link copied'
        copyLinkBtn.classList.add('copied')
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', copyContent)
}

// Range

const
    rangeWrapper = document.querySelectorAll('.tickets__range'),
    improvementBtn = document.querySelectorAll('.improvement-btn');

improvementBtn.forEach(btn => {
    const parent = btn.parentNode;

    btn.addEventListener('click', () => {
        parent.querySelector('.tickets__range').classList.add('is-active')
    })

    document.addEventListener('click', (e) => {
        rangeWrapper.forEach(el => {
            let target = e.target;
            let its_menu = target === el || el.classList.contains(target);
            let its_hamburger = target === btn;
            let menu_is_active = el.classList.contains('is-active');

            if (!its_menu && !its_hamburger && menu_is_active) {
                el.classList.remove('is-active')
            }
        })
    })

})

rangeWrapper.forEach(el => {

    let range = el.querySelector('.range'),
        rangeValue = el.querySelector('.range-value'),
        rangePos = 0;

    let init = (value) => {
        rangeValue.innerHTML = `${value}%`
        rangeValue.style.width = `${rangePos} = ${value}%`
    }

    let updateValue = (value) => {
        rangeValue.innerHTML = Math.floor(value) + '%';

        if (value > 1) {
            el.parentNode.querySelector('.improvement-btn').innerHTML = `+${value}% Improved Probability`
            el.parentNode.querySelector('.improvement-btn').classList.add('is-active')
        } else {
            el.parentNode.querySelector('.improvement-btn').innerHTML = 'Apply improvement'
            el.parentNode.querySelector('.improvement-btn').classList.remove('is-active')
        }

    }

    let updateVar = (value) => {
        el.querySelector('.tickets__range-line').style.background =
            `linear-gradient(to right, #A289FC 0%, #A289FC ${value * 2}%, transparent ${value * 2}%, transparent 100%)`
    }

    init(range.value);

    range.addEventListener('input', () => {
        updateVar(range.value);
        updateValue(range.value);
    });

})



