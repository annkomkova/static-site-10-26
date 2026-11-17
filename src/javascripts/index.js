checkElements()
headerScroll()
moveMarquee()

// для анимации элементов
function checkElements() {
  let elements = document.querySelectorAll('.reveal')

  elements.forEach((element) => {
    let rect = element.getBoundingClientRect()

    if (rect.top < window.innerHeight * 0.9) {
      if (element.classList.contains('reveal')) {
        element.classList.add('reveal--visible')
      }
    }
  })
}

// скрытие и анимация верхнего меню по скроллу
function headerScroll() {
  let header = document.querySelector('.header')
  let lastScroll = 0

  window.addEventListener('scroll', () => {
    let scroll = window.scrollY

    if (scroll > 20) {
      header.classList.add('header--scrolled')
    } else {
      header.classList.remove('header--scrolled')
    }

    if (scroll > 100 && scroll > lastScroll) {
      header.classList.add('header--hidden')
    } else {
      header.classList.remove('header--hidden')
    }

    lastScroll = scroll
  })
}

// бегущие строки
function moveMarquee() {
  let marquee = document.querySelector('.marquee')
  let rows = marquee.querySelectorAll('.marquee__row')
  let position = 0
  let direction = -1
  let speed = 1
  let lastScroll = window.scrollY
  let timer

  window.addEventListener('scroll', () => {
    let delta = window.scrollY - lastScroll
    lastScroll = window.scrollY

    if (delta > 0) {
      direction = 1
    } else {
      direction = -1
    }

    speed = 1 + Math.min(Math.abs(delta) / 10, 4)

    let skew = Math.max(-8, delta * 0.6)
    marquee.style.transform = `skewX(${skew}deg)`

    clearTimeout(timer)
    timer = setTimeout(() => {
      marquee.style.transform = `skewX(0)`
      speed = 1
    }, 150)
  })

  setInterval(() => {
    position = position - 0.05 * speed * direction

    if (position < -100) {
      position = position + 100
    }
    if (position > 0) {
      position = position - 100
    }

    rows.forEach((row) => {
      let tracks = row.querySelectorAll('.marquee__track')
      let x = position

      if (row.classList.contains('marquee__row-reverse')) {
        x = -100 - position
      }

      tracks.forEach((track) => {
        track.style.transform = `translateX(${x}%)`
      })
    })
  }, 15)
}
