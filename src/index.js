let nodes = []
let rate = 0.09

let boundParallax

export default class {
    constructor(opts = {}) {
        // fallback to defaults
        this.opts = {
            selector: `.js-parallax`,
            el: null,
            els: [],
            rate: 0.09,
            multiplier: 0,
            start: true,
            ...opts
        }

        this.nodes = []

        // we've set an el or els, so let's use them instead of the selector
        if (this.opts.el != null) {
            this.nodes = [this.opts.el]
        } else if (this.opts.els.length) {
            this.nodes = [...this.opts.els]
        } else {
            // otherwise, let's build our node list from the selector
            this.nodes = [...document.querySelectorAll(this.opts.selector)]
        }

        if (this.opts.start) {
            this.start()
        }

        boundParallax = this.parallaxAnimation.bind(this)
    }

    start() {
        window.addEventListener('scroll', boundParallax)
    }
    clear() {
        this.nodes.forEach(node => {
            node.style.transform = ''
        })
    }
    stop(clear = true) {
        window.removeEventListener('scroll', boundParallax, true)
        if (clear) {
            this.clear()
        }
    }

    parallaxAnimation() {
        requestAnimationFrame(() => {
            // get number of pixels document has scrolled vertically
            let scrolltop = window.pageYOffset
            this.nodes.forEach((node, i) => {
                let y = -scrolltop * this.opts.rate
                if (this.multiplier) {
                    y = -scrolltop * (i + 1) * this.opts.rate
                }
                node.style.transform = `translate3d(0, ${y}px, 0)`
            })
        })
    }
}
