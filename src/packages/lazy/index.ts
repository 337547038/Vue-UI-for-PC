import {App, DirectiveBinding, nextTick} from 'vue'
import {prefixCls} from '../prefix'
import {addClass, removeClass} from '../util/dom'
import LAZY_ERROR from './img/lazy-error.png'
import LAZY_DEFAULT from './img/lazy-default.gif'

const LAZY_LOADING_CLS = prefixCls + '-lazy-loading' // 图片初始时添加的样式
const LAZY_ERROR_CLS = prefixCls + '-lazy-error' // 加载错误时添加的样式
// const LAZY_ERROR = '/static/img/lazy-error.png' // 加载错误显示的图片
// const LAZY_DEFAULT = '/static/img/lazy-default.gif'// 默认显示的图片
interface OptList {
  error?: string
  loading?: string
  fadeIn?: boolean
  threshold?: number
}

class Lazy {
  error: string
  isLoad: boolean
  loading: string
  fadeIn: boolean
  threshold: number
  imgSrc: string
  container: any
  el: any

  constructor(opt: OptList) {
    this.isLoad = false
    this.loading = opt.loading || LAZY_DEFAULT
    this.error = opt.error || LAZY_ERROR // 加载错误时显示的图片
    this.fadeIn = opt.fadeIn || true
    this.threshold = opt.threshold || 0
    this.imgSrc = ''// 图片实际路径
    this.container = ''
    this.el = ''
  }

  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    const defaultImg = el.getAttribute('src') // 单个图默认初始图，一般可为gif加载图
    if (defaultImg) {
      this.loading = defaultImg
    }
    const errorImg = el.getAttribute('data-error') // 单个指定加载错误显示的图
    if (errorImg) {
      this.error = errorImg
    }
    this.imgSrc = binding.value || el.getAttribute('data-src') // 图片实际路径
    // 初始时给图片添加一个样式，方便对初始图和实际图设置不同的大小，待图片加载完后再去掉添加的样式
    this.container = binding.arg
    this.el = el
    addClass(el, LAZY_LOADING_CLS)
    // 对单图没设置有初始图时，这里先设置初始图
    if (!el.getAttribute('src')) {
      el.setAttribute('src', this.loading)
    }
    nextTick(() => {
      this.renderImg()
    })
  }

  renderImg() {
    // 判断图片是否在可视区
    // 在可视区时，1.设置为真实图片路径，2.去掉添加的临时样式
    // 不在可视区，添加scroll和resize监听事件
    const container = this.container ? document.getElementById(this.container) : window
    if (this.inView(container)) {
      this.loadImg()
        .then((img: any) => {
          this.el.setAttribute('src', img)
          if (this.fadeIn) {
          // 谈入
            this.el.style.opacity = 0
            setTimeout(() => {
              this.el.style.opacity = 1
              this.el.style.transition = 'opacity 1s'
            }, 50)
          }
          removeClass(this.el, LAZY_LOADING_CLS)
          removeClass(this.el, LAZY_ERROR_CLS)
        })
        .catch(() => {
          this.el.setAttribute('src', this.error)
          removeClass(this.el, LAZY_LOADING_CLS)
          addClass(this.el, LAZY_ERROR_CLS)
        })
      if (this.isLoad) {
        this.unBindEvent(container as Window)
      }
    } else {
      if (!this.isLoad) {
        this.isLoad = true
        this.bindEvent(container as Window)
      }
    }
  }

  loadImg() {
    return new Promise((resolve, reject) => {
      const img = new Image()
      /* if (img.complete) {
      // 如果图片已经存在于浏览器缓存,直接调用回调函数
      // console.log('complete')
      callback(url)
      return // 直接返回,不再处理onload事件
    } */
      img.onload = function () {
        // console.log('onload')
        resolve(img.src)
      }
      img.onerror = function () {
        // console.log('onerror')
        const error = 'error'
        reject(error)
      }
      img.src = this.imgSrc
    })
  }

  // 判断是否在可视区域
  inView(container: any) {
    let isView = false
    const rect = this.el.getBoundingClientRect()
    console.log(rect)
    const parentRect = container === window ? {left: 0, top: 0} : container.getBoundingClientRect()
    const viewWidth = container === window ? window.innerWidth : container.clientWidth
    const viewHeight = container === window ? window.innerHeight : container.clientHeight
    if (rect.bottom > this.threshold + parentRect.top && rect.top + this.threshold < viewHeight + parentRect.top && rect.right > this.threshold + parentRect.left && rect.left + this.threshold < viewWidth + parentRect.left) {
      isView = true
    }
    console.log(isView)
    return isView
  }

  bindEvent(container: HTMLElement | Window): void {
    container.addEventListener('scroll', this.renderImg.bind(this), false)
    if (container === window) {
      window.addEventListener('resize', this.renderImg.bind(this), false)
    }
  }

  unBindEvent(container: HTMLElement | Window): void {
    container.removeEventListener('scroll', this.renderImg.bind(this), false)
    if (container === window) {
      window.removeEventListener('resize', this.renderImg.bind(this), false)
    }
  }
}

export default {
  install(app: App, options = {}) {
    app.directive('lazy', {
      mounted(el, binding) {
        const lazy = new Lazy(options)
        lazy.mounted(el, binding)
      },
      updated(el, binding) {
        const lazy = new Lazy(options)
        lazy.mounted(el, binding)
      }
      // mounted: lazy.mounted.bind(lazy)
      // updated: lazy.update.bind(lazy),
      // unmounted: lazy.update.bind(lazy)
    })
  }
}
