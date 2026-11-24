checkElements()
headerScroll()
moveMarquee()
highlightWords()
countNumbers()
move3dCard()
showPreviewBlob()

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

//перекрашиваем слова по скроллу в секции о проекте
function highlightWords() {
  let lead = document.querySelector('.about__lead')
  let words = lead.innerText.split(' ')
  let html = ''

  words.forEach((word) => {
    if (word.toLowerCase().includes('цветоч')) {
      html += `<span class="about__word about__word--accent">${word}</span> `
    } else {
      html += `<span class="about__word">${word}</span> `
    }
  })

  lead.innerHTML = html
  let spans = lead.querySelectorAll('.about__word')

  window.addEventListener('scroll', () => {
    let rect = lead.getBoundingClientRect()
    let progress =
      (window.innerHeight * 0.85 - rect.top) /
      (rect.height + window.innerHeight * 0.3)
    let p = Math.max(0, Math.min(progress, 1))
    let activeCount = Math.round(p * spans.length)

    spans.forEach((span, index) => {
      if (index < activeCount) {
        span.classList.add('about__word--active')
      } else {
        span.classList.remove('about__word--active')
      }
    })
  })
}

// подсчитываем числа от 0 до n при первом скролле
function countNumbers() {
  let numbers = document.querySelectorAll('.about__number')

  numbers.forEach((number) => {
    let target = parseInt(number.innerText)
    let started = false

    number.innerText = 0

    window.addEventListener('scroll', () => {
      let rect = number.getBoundingClientRect()

      if (rect.top < window.innerHeight * 0.8 && !started) {
        started = true

        let current = 0
        let step = Math.ceil(target / 60)

        let interval = setInterval(() => {
          current = current + step

          if (current >= target) {
            current = target
            clearInterval(interval)
          }

          number.innerText = current
        }, 50)
      }
    })
  })
}

// 3-d наклон карточки за движением мышки
function move3dCard() {
  let link = document.querySelector('.card__link')
  let media = link.querySelector('.card__media')

  link.addEventListener('mousemove', (event) => {
    let rect = media.getBoundingClientRect()

    let x = (event.clientX - rect.left) / rect.width - 0.5
    let y = (event.clientY - rect.top) / rect.height - 0.5

    media.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`
  })

  link.addEventListener('mouseleave', () => {
    media.style.transform = ``
  })
}

//анимированный курсор со сменой цвета в разделе превью
function showPreviewBlob() {
  let blob = document.querySelector('.soon__blob')
  let items = document.querySelectorAll('.soon__item')
  let colors = ['pink', 'liliac', 'peach', 'lime']

  document.addEventListener('mousemove', (event) => {
    blob.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
  })

  items.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      blob.className = `soon__blob preview--active preview--${colors[index]}`
    })

    item.addEventListener('mouseleave', () => {
      blob.classList.remove('preview--active')
    })
  })
}
