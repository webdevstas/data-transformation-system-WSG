import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default {
  install: (app) => {
    gsap.registerPlugin(ScrollTrigger)
    app.mixin({
      created() {
        this.gsap = gsap
        this.ScrollTrigger = ScrollTrigger
      }
    })
  }
}
