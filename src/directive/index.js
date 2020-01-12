const install = function (Vue, options) {
  // 裁切文字，溢出显示...
  Vue.directive('textOverflow', {
    inserted: function (el, binding) {
      if (!el.innerHTML) {
        return
      }
      if (el.scrollHeight > el.offsetHeight) {
        const arr = el.innerHTML.split('')
        while (el.scrollHeight > el.offsetHeight) {
          el.innerHTML = arr.join('')
          arr.pop()
        }
        // 将最后一个字符去掉，添加...
        el.innerHTML = el.innerHTML.substr(0, el.innerHTML.length - 1) + '...'
      }
    }
  })
  /* Vue.directive('test', {
    inserted: function (el, binding) {
      console.log('ok2')
      el.innerHTML = '123'
    }
  }) */
}

export default install
