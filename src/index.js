let nodes = []

function parallaxAnimation() {
    // get number of pixels document has scrolled vertically
    let scrolltop = window.pageYOffset
    nodes.forEach(node => {
        // move at 9% of scroll rate
        node.style.transform = `translate3d(0, ${-scrolltop * rate}px, 0)`
    })
}

function runParallax() {
    // on page scroll
    requestAnimationFrame(parallaxAnimation) // call parallaxAnimation() on next available screen paint
}

const clearParallax = () => {
    window.removeEventListener('scroll', runParallax)
}

export default (selector = `.js-parallax`, rate = 0.09) => {
    nodes = Array(...document.querySelectorAll(selector))
    window.addEventListener('scroll', runParallax)
}
