const $ = (selector, context = document) => Array(...context.querySelectorAll(selector))

const parallax = (selector = `.js-parallax`, rate = .09) => {
  // Create cross browser requestAnimationFrame method:
  window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(f) {
      setTimeout(f, 1000 / 60)
    }

  let nodes = $(selector)

  function parallaxAnimation() {
    // get number of pixels document has scrolled vertically
    let scrolltop = window.pageYOffset
    nodes.forEach(node => {
      // move at 9% of scroll rate
      node.style.transform = `translate3d(0, ${-scrolltop * rate}px, 0)`
    })
  }

  window.addEventListener('scroll', function() { // on page scroll
    requestAnimationFrame(parallaxAnimation) // call parallaxAnimation() on next available screen paint
  }, false)
}

export default parallax