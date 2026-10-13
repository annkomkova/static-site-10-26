checkElements()

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
