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
