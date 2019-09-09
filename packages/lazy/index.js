const LAZY_LOADING = 'lazy-loading' // 图片初始时添加的样式
const LAZY_ERROR = 'lazy-error' // 加载错误时添加的样式
const LazyLoad = function (el, options) {
  this.isLoad = false
  this.el = el
  this.options = options
  this.delayRender = this.render.bind(this)
}
LazyLoad.prototype = {
  render () {
    // 判断图片是否在可视区
    // 在可视区时，1.设置为真实图片路径，2.去掉添加的临时样式
    // 不在可视区，添加scroll和resize监听事件
    // console.log('render')
    const options = this.options
    let container = options.container === '' ? window : document.getElementById(options.container)
    if (!this.isLoad) {
      this.bindEvent(container)
      this.isLoad = true
    }
    if (this.inView(this.el, container, options.threshold)) {
      // 在可视区域
      this.loadImg(options.imgSrc, img => {
        // console.log('图片加载完成')
        let imgClass = options.imgClass
        if (img === 'error') {
          this.el.setAttribute('src', this.options.error)
          imgClass = imgClass + ' ' + LAZY_ERROR
        } else {
          this.el.setAttribute('src', img)
          if (this.options.fadeIn) {
            // 谈入
            this.el.style.opacity = 0
            setTimeout(() => {
              this.el.style.opacity = 1
              this.el.style.transition = 'opacity 1s'
            }, 50)
          }
        }
        this.el.setAttribute('class', imgClass.replace(' ' + LAZY_LOADING, '').replace(LAZY_LOADING, ''))
      })
      this.unBindEvent(container)
    }
  },
  inView (el, container, threshold) {
    let isView = false
    const rect = el.getBoundingClientRect()
    const parentRect = container === window ? {left: 0, top: 0} : container.getBoundingClientRect()
    const viewWidth = container === window ? window.innerWidth : container.clientWidth
    const viewHeight = container === window ? window.innerHeight : container.clientHeight
    if (rect.bottom > threshold + parentRect.top && rect.top + threshold < viewHeight + parentRect.top && rect.right > threshold + parentRect.left && rect.left + threshold < viewWidth + parentRect.left) {
      isView = true
    }
    return isView
  },
  // 加载图片资源
  loadImg (url, callback) {
    const img = new Image()
    /* if (img.complete) {
      // 如果图片已经存在于浏览器缓存,直接调用回调函数
      // console.log('complete')
      callback(url)
      return // 直接返回,不再处理onload事件
    } */
    img.onload = function () {
      // console.log('onload')
      callback(img.src)
    }
    img.onerror = function () {
      // console.log('onerror')
      const error = 'error'
      callback(error)
    }
    img.src = url
  },
  // 为图片添加绑定事件
  bindEvent (container) {
    container.addEventListener('scroll', this.delayRender, false)
    if (container === window) {
      window.addEventListener('resize', this.delayRender, false)
    }
  },
  unBindEvent (container) {
    container.removeEventListener('scroll', this.delayRender, false)
    if (container === window) {
      window.removeEventListener('resize', this.delayRender, false)
    }
  }
  // 函数去抖
  // const debounce = debounce(fn,delay)
  /* debounce: function (fn, delay) {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  } */
}
export default {
  install: function (Vue, options) {
    const defaultOptions = {
      error: '/static/img/lazy-error.png', // 加载错误显示的图片
      default: '/static/img/lazy-default.gif', // 默认显示的图片
      fadeIn: true, // 是否谈入
      threshold: 0 // 图片离可视区域的距离。负值表示提前进入，正值表示延迟进入
    }
    options = Object.assign({}, defaultOptions, options)
    Vue.directive('lazy', {
      bind (el, binding) {
        const defaultImg = el.getAttribute('src') || options.default // 单个图默认初始图，一般可为gif加载图
        const errorImg = el.getAttribute('data-error') || options.error // 单个指定加载错误显示的图
        const imgSrc = binding.value || el.getAttribute('data-src') // 图片实际路径
        // 初始时给图片添加一个样式，方便对初始图和实际图设置不同的大小，待图片加载完后再去掉添加的样式
        const imgClass = el.getAttribute('class') || ''
        let setClass = LAZY_LOADING
        if (imgClass) {
          setClass = imgClass + ' ' + LAZY_LOADING
        }
        el.setAttribute('class', setClass)
        // 对单图没设置有初始图时，这里先设置初始图
        if (!el.getAttribute('src')) {
          el.setAttribute('src', defaultImg)
        }
        const opt = {
          default: defaultImg, // 单个图默认初始图，一般可为gif加载图, // 默认显示的图片
          error: errorImg, // 加载错误显示的图片
          imgSrc: imgSrc, // 真实显示的图片
          imgClass: setClass, // 当前图片class
          container: binding.arg || '',
          fadeIn: options.options || true,
          threshold: options.threshold || 0
        }
        // console.log(opt)
        Vue.nextTick(() => {
          // lazyLoad.render(el, Object.assign({}, opt))
          new LazyLoad(el, Object.assign({}, opt)).render()
        })
      }
    })
  }
}
