import axios from 'axios'

export default {
  methods: {
    getUpload (file, data, type, callback) {
      if (type) {
        this.axios(file, data, callback)
      } else {
        console.log('comm ie9')
        this.formUpload(file, data, callback)
      }
    },
    // 上传图片转blob预览
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)兼容火狐
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    axios (file, data, callback) {
      let param = new FormData()
      // 图片裁切时是通过base64转为blob数据流，因此要在后面添加文件名，否则上传的是一个blob文件
      param.append(data.name, file, data.fileName)
      if (data.data) {
        for (let i in data.data) {
          param.append(i, data.data[i])
        }
      }
      this.source = axios.CancelToken.source()
      const cancelToken = this.source.token
      let config = {
        cancelToken,
        headers: Object.assign({'Content-Type': 'multipart/form-data'}, data.headers),
        timeout: data.timeout, // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
        onUploadProgress: progressEvent => {
          const complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          // 上传进度
          console.log(complete)
          callback(complete, 'loaded')
        }
      }
      axios.post(data.action, param, config)
        .then(res => {
          console.log(res)
          callback(res, 'success')
        })
        .catch(res => {
          console.log(res, 'catch')
          callback(res)
        })
    },
    formUpload (file, data, callback) {
      // 低版本浏览器使用form+iframe上传
      let iframe = document.createElement('iframe')
      iframe.id = 'upload-iframe-' + this.randomId
      iframe.name = 'upload-iframe-' + this.randomId
      iframe.src = 'about:blank'
      iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;')

      let form = document.createElement('form')
      form.action = data.action
      form.setAttribute('method', 'POST')
      form.setAttribute('target', 'upload-iframe-' + this.randomId)
      form.setAttribute('enctype', 'multipart/form-data')
      for (let i in data.data) {
        let input = document.createElement('input')
        input.type = 'hidden'
        input.name = i
        input.value = data.data[i]
        form.appendChild(input)
      }
      form.appendChild(file)
      document.body.appendChild(iframe).appendChild(form)
      // iFrame.attachEvent( "onload",loadFunc);
      let getResponseData = function () {
        let doc
        try {
          if (iframe.contentWindow) {
            doc = iframe.contentWindow.document
          }
        } catch (err) {
        }
        console.log('doc')
        console.log(doc)
        if (!doc) {
          try {
            doc = iframe.contentDocument ? iframe.contentDocument : iframe.document
          } catch (err) {
            doc = iframe.document
          }
        }
        if (doc && doc.body) {
          return doc.body.innerHTML
        }
        return null
      }
      iframe.onload = function (e) {
        let response = getResponseData()
        console.log('response')
        console.log(response)
        // this.$emit('success', response)
        callback(response, 'success')
        // 移除添加的iframe
        iframe.parentNode && iframe.parentNode.removeChild(iframe)
      }
      form.submit()
    }
  }
}
