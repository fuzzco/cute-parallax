let nodes = []
let rate = 0.09

export default class {
    constructor(selector = `.js-parallax`, rate = 0.09, start = true) {
        this.selector = selector
        this.nodes = Array(...document.querySelectorAll(this.selector))
        this.rate = rate

        if (start) {
            this.start()
        }
    }

    start() {
        window.addEventListener('scroll', this.parallaxAnimation)
    }
    clear() {
        this.nodes.forEach(node => {
            node.style.transform = ''
        })
    }
    stop(clear = true) {
        window.removeEventListener('scroll', this.parallaxAnimation)
        if (clear) {
            this.clear()
        }
    }

    parallaxAnimation() {
        requestAnimationFrame(() => {
            // get number of pixels document has scrolled vertically
            let scrolltop = window.pageYOffset
            this.nodes.forEach(node => {
                node.style.transform = `translate3d(0, ${-scrolltop *
                    rate}px, 0)`
            })
        })
    }
}
