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
import axios from 'axios'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Upload`,
  data () {
    return {
      prefixCls: prefixCls,
      randomId: Math.random().toString(36).substr(2, 10),
      tempFiles: []
    }
  },
  props: {
    value: Array,
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
    maxSize: Number // 文件大小限制，单位 kb
  },
  components: {},
  methods: {
    _onFileChange (e) {
      this.tempFiles = []
      let file = e.target.files
      if (file) {
        for (let i = 0; i < file.length; i++) {
          this.tempFiles.push({
            size: this._unitFormat(file[i].size), // 大小
            loaded: '', // 上传进度
            name: file[i].name,
            base64: '', // base64
            type: file[i].type,
            status: 0, // 上传状态，0上传时，1成功，-1失败
            verify: '' // 验证结果
          })
          this._readFile(file[i], i)
          this._axios(file[i], i)
        }
      } else {
        // ie9时 e.target.files=undefined
        // 这时也不支持批量上传
        this._formUpload()
      }
      this.$emit('input', this.tempFiles)
    },
    // 转图片转为base64，可在图片没上传完前先显示图片
    _readFile (imgFile, index) {
      const that = this
      if (/image\/\w+/.test(imgFile.type)) {
        // alert('请确保文件为图像类型')
        const reader = new FileReader()
        reader.readAsDataURL(imgFile)
        reader.onload = function (event) {
          that.tempFiles[index].base64 = event.target.result
          // imgFile.dataUrl = event.target.result
        }
      }
    },
    // 单位换算
    _unitFormat (size) {
      if (size === 0) return '0B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(size) / Math.log(k))
      return (size / Math.pow(k, i)).toPrecision(3) + sizes[i]
    },
    _formUpload () {
      // 低版本浏览器使用form+iframe上传
      let iframe = document.createElement('iframe')
      iframe.id = 'upload-iframe-' + this.randomId
      iframe.name = 'upload-iframe-' + this.randomId
      iframe.src = 'about:blank'
      iframe.setAttribute('style', 'width:1px;height:1px;top:-999em;position:absolute; margin-top:-999em;')

      let form = document.createElement('form')
      form.action = this.action
      form.setAttribute('method', 'POST')
      form.setAttribute('target', 'upload-iframe-' + this.randomId)
      form.setAttribute('enctype', 'multipart/form-data')
      for (let i in this.data) {
        let input = document.createElement('input')
        input.type = 'hidden'
        input.name = i
        input.value = this.data[i]
        form.appendChild(input)
      }
      form.appendChild(this.$refs.inputFile)
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
        console.log(response)
        this.$emit('success', response)
        // 移除添加的iframe
        iframe.parentNode && iframe.parentNode.removeChild(iframe)
      }
      form.submit()
    },
    _axios (file, index) {
      let check = this._check(file)
      if (check) {
        // 没有通过
        this.tempFiles[index].verify = check
        // this.$emit('error', check)
      } else {
        let param = new FormData()
        param.append(this.name, file)
        if (this.data) {
          for (let i in this.data) {
            param.append(i, this.data[i])
          }
        }
        let config = {
          headers: Object.assign({'Content-Type': 'multipart/form-data'}, this.headers),
          onUploadProgress: progressEvent => {
            const complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            // 多图上传时
            this.tempFiles[index].loaded = complete
          }
        }
        axios.post(this.action, param, config)
          .then(res => {
            console.log(res)
            // this.tempFiles[index].success = res
            this.tempFiles[index].status = 1
            this.$emit('success', res, index)
          })
          .catch(res => {
            console.log(res)
            // this.tempFiles[index].error = res
            this.tempFiles[index].status = -1
            this.$emit('error', res, index)
          })
      }
    },
    // 检查文件合法性
    _check (file) {
      // 检查上传文件合法性
      let name = file.name
      let suffix = name.substr(name.length - 3, 3)
      if (this.format) {
        if (this.format.indexOf(suffix) !== -1) {
          // console.log('pass');
        } else {
          let format = this.format ? this.format.toString() : ''
          return '只支持上传类型为：' + format
        }
      }
      if (this.maxSize && file.size > this.maxSize * 1024) {
        return `文件${name}超出最大${this.maxSize}kb上传限制`
      }
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
