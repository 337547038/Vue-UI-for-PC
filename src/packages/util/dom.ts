/**
 * Created by 337547038 on 2018/9/5 0005.
 */

/* 节点操作的一些方法 */
interface Offset {
  width: number
  height: number
  left: number
  top: number
}
export default function () {
  const scrollTop = () => {
    // 滚动条的位置
    return document.documentElement.scrollTop || document.body.scrollTop
  }
  const getOffset = (el: HTMLElement):Offset => {
    console.log(el)
    // 返回元素偏移位置
    /*if (!el) {
      return
    }*/
    const componentRect = el.getBoundingClientRect()
    const top = componentRect.top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
    const left = componentRect.left + (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0)
    const width = el.offsetWidth
    const height = el.offsetHeight
    return {left: left, top: top, width: width, height: height}
  }
  const getWindow = () => {
    // 返回窗口宽高
    const width = document.documentElement.clientWidth || document.body.clientWidth
    const height = document.documentElement.clientHeight || document.body.clientHeight
    return {width: width, height: height}
  }
  const getScrollbarWidth = () => {
    // 取滚动条的宽
    const hasScroll = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    if (hasScroll) {
      const scrollDiv = document.createElement('div')
      scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'
      document.body.appendChild(scrollDiv)
      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
      return scrollbarWidth
    }
  }
  const hasClass = (elements: Element, cName = '') => {
    return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'))
  }
  const addClass = (elements: Element, cName = '') => {
    if (!hasClass(elements, cName)) {
      if (elements.className) {
        elements.className += ' ' + cName
      } else {
        elements.className += cName
      }
    }
  }
  const removeClass = (elements: Element, cName = '') => {
    if (hasClass(elements, cName)) {
      elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), '')
    }
  }
  return {
    scrollTop,
    getOffset,
    getWindow,
    getScrollbarWidth,
    hasClass,
    addClass,
    removeClass
  }
}
