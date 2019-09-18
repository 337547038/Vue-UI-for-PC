<!--Created by 337547038 on 2019/2.-->
<template>
  <div :class="`${prefixCls}-upload`">
    <label :for="randomId" class="file">
      <slot></slot>
      <input type="file"
             ref="inputFile"
             @change="_onFileChange"
             :multiple="multiple"
             :id="randomId"
             :accept="accept"
             :name="name">
    </label>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import comm from './comm'

export default {
  name: `${prefixCls}Upload`,
  data () {
    return {
      prefixCls: prefixCls,
      axiosUpload: true, // 使用哪种方式上传
      randomId: Math.random().toString(36).substr(2, 10),
      tempFiles: []
    }
  },
  mixins: [comm],
  props: {
    value: [Array],
    name: { // input标签的 name 属性
      type: String,
      default: 'file'
    },
    action: String, // 上传地址
    multiple: {// 是否支持多选文件
      type: Boolean,
      default: false
    },
    accept: String, // h5原生属性，接受上传的文件类型，即打开上传框时默认选择的类型
    data: Object, // 附加请求的参数
    headers: Object, // 上传请求 header 数据
    format: Array, // 支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
    maxSize: {
      // 最大上传限制kb
      type: Number,
      default: 1024
    },
    error: Function,
    success: Function,
    timeout: {
      // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
      type: Number,
      default: 0
    }
  },
  components: {},
  methods: {
    _onFileChange (e) {
      this.tempFiles = []
      let file = e.target.files
      if (file) {
        for (let i = 0; i < file.length; i++) {
          let src = ''
          if (/image\/\w+/.test(file[i].type)) {
            src = this.getObjectURL(file[i])
          }
          this.tempFiles.push({
            size: this._unitFormat(file[i].size), // 大小
            loaded: '0%', // 上传进度
            name: file[i].name,
            src: src, // 预览用的src
            type: file[i].type,
            status: 0, // 上传状态，0上传时，1成功，-1失败
            verify: '' // 验证结果，批量上传时
          })
          this._check(file[i], i)
        }
        this.axiosUpload = true
      } else {
        // ie9时 e.target.files=undefined
        // 这时也不支持批量上传
        this.axiosUpload = false
        // const fileObj = e.target
        const fileObj = this.$refs.inputFile
        fileObj.select()
        fileObj.blur()
        const dataURL = document.selection.createRange().text
        const suffix = dataURL.substr(dataURL.lastIndexOf('.') + 1)
        const imgA = ['jpg', 'gif', 'png']
        const dataURL2 = dataURL.replace(/\\/g, '/')
        if (imgA.indexOf(suffix) !== -1) {
          const len = dataURL2.lastIndexOf('/')
          const fileName = dataURL2.substr(len + 1) // 截取文件名
          this.tempFiles.push({
            name: fileName,
            src: dataURL2 // 预览用的src
          })
        }
        const data = {
          name: this.name, // 文件域的name值
          action: this.action,
          headers: this.headers,
          data: this.data,
          timeout: this.timeout
        }
        this.upload(fileObj, data, this.axiosUpload, this._uploadStatus)
      }
      this.$emit('input', this.tempFiles)
    },
    // 单位换算
    _unitFormat (size) {
      if (size === 0) return '0B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(size) / Math.log(k))
      return (size / Math.pow(k, i)).toPrecision(3) + sizes[i]
    },
    // 检查文件合法性
    _check (file, index) {
      let error = {}
      let name = file.name
      let suffix = name.substr(name.length - 3, 3)
      if (this.format) {
        if (this.format.indexOf(suffix) !== -1) {
          // console.log('pass');
        } else {
          let format = this.format ? this.format.toString() : ''
          // return '只支持上传类型为：' + format
          error = {code: 2, msg: '只支持上传类型为：' + format}
        }
      }
      /* let imgSize = file.target.fileSize
        if (file && file.size) {
          imgSize = file.size
        } */
      let fileSize = file.size
      if (fileSize && fileSize > this.maxSize * 1024) {
        error = {code: 1, msg: '超出上传限制'}
      }
      this.tempFiles[index].verify = error
      if (!this.multiple) {
        // 单个文件上传时，放error里提示
        if (error.code) {
          this.$emit('error', error)
          this.error && this.error(error)
          return false
        }
      }
      if (!error.code) {
        this._axios(file, index)
      }
    },
    _axios (file, index) {
      const data = {
        name: this.name, // 文件域的name值
        action: this.action,
        headers: this.headers,
        data: this.data,
        timeout: this.timeout
      }
      this.upload(file, data, this.axiosUpload, this._uploadStatus.bind(this, index)) // 将图片上传
    },
    // 上传回调事件
    _uploadStatus (index, res, type) {
      console.log('_uploadStatus')
      console.log(res, type, index)
      switch (type) {
        case 'loaded':
          this.tempFiles[index].loaded = res
          break
        case 'success':
          this.$emit('success', res, index)
          this.success && this.success(res)
          this.tempFiles[index].status = 1
          // this.reset()
          break
        case 'catch':
          this._emit('error', res, index)
          this.tempFiles[index].status = -1
          // this.reset()
          break
      }
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
