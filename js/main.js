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
    new Swiper(Leaderboard, {
        spaceBetween: 100,
        slidesPerView: 1,
        pagination: {
            el: '.leaderboard-pagination',
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
    copyLinkBtn = document.querySelector('.copy-ref-btn')

const copyContent = async () => {
    const copyText = document.querySelector('.ref-link__value').value

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
    const parent = btn.parentNode

    btn.addEventListener('click', () => {
        parent.querySelector('.tickets__range').classList.add('is-active')
    })
})

document.addEventListener('click', (e) => {
    const
        target = e.target,
        targetParent = target.parentElement;

    if (
        target.classList.contains('improvement-btn') ||
        target.classList.contains('tickets__range') ||
        targetParent.classList.contains('tickets__range')
    ) {
        const thisWindow = targetParent.querySelector('.tickets__range')

        rangeWrapper.forEach(window => {
            if (window !== thisWindow) window.classList.remove('is-active')
        })
    } else {
        rangeWrapper.forEach(window => window.classList.remove('is-active'))
    }
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

    init(range.value)

    range.addEventListener('input', () => {
        updateVar(range.value)
        updateValue(range.value)
    });

})

// Accordion

const accordions = document.querySelectorAll('.faq__item');

const openAccordion = (accordion) => {
    const content = accordion.querySelector('.faq__body');
    accordion.classList.add('is-open');
    content.style.maxHeight = content.scrollHeight + 34 + 'px';
};

const closeAccordion = (accordion) => {
    const content = accordion.querySelector('.faq__body');
    accordion.classList.remove('is-open');
    content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
    const intro = accordion.querySelector('.faq__head');
    const content = accordion.querySelector('.faq__body');

    intro.onclick = () => {
        if (content.style.maxHeight) {
            closeAccordion(accordion);
        } else {
            accordions.forEach((accordion) => closeAccordion(accordion));
            openAccordion(accordion);
        }
    };
});
