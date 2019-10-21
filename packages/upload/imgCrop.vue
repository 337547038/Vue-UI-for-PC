<!-- Created by 337547038 on 2019/9/10 0010. -->
<template>
  <div :class="`${prefixCls}-upload-crop`">
    <!--<img :src="imgsrc" border="1">-->
    <div class="main-crop" :style="{width:boxWidthPx,height:boxHeightPx}" ref="mainCrop">
      <a href="javascript:;" class="select-img" @click="_selectImg" :style="{lineHeight:boxHeightPx}"
         v-show="!drawImg.img">选择图片</a>
      <!--裁切框，zIndex为最顶层-->
      <div class="control-box"
           :style="controlBoxStyle"
           v-show="drawImg.img!==null"
           @mousedown="_controlBoxMouseDown">
        <div class="select-area-tips">
          w:{{parseInt(controlBox.width)}} h:{{parseInt(controlBox.height)}}
          (x:{{parseInt(controlBox.left)}},y:{{parseInt(controlBox.top)}},scale:{{scale}})
        </div>
        <span v-for="(item,index) in controlBtnList" :key="index" :class="item"
              @mousedown="_controlBtnMouseDown($event,item)" class="control-btn"></span>
        <div class="box-line box-line-1"></div>
        <div class="box-line box-line-2"></div>
        <div class="box-line box-line-3"></div>
        <div class="box-line box-line-4"></div>
      </div>
      <!--显示裁切框和遮罩层-->
      <canvas class="canvas-crop"
              ref="canvasSelectBox"
              :width="boxWidthPx"
              :height="boxHeightPx"
              @mousedown="_controlCanvasMouseDown"
              v-show="drawImg.img"></canvas>
      <!--将图片画在这里作为底图，zIndex为最底层-->
      <canvas class="canvas-crop-img"
              ref="canvas"
              :width="boxWidthPx"
              :height="boxHeightPx"
              v-show="drawImg.img"></canvas>
    </div>
    <div class="crop-btn">
      <a href="javascript:;" class="crop-select" @click="_selectImg">选择图片</a>
      <a href="javascript:;" class="crop-upload" @click="_cropPicture"><slot></slot></a>
    </div>
    <form ref="formReset">
      <input @change="_fileChange" ref="inputFile" type="file" accept="image/*" class="image-file">
    </form>
  </div>
</template>

<script>
import comm from './comm'
import {prefixCls} from '../prefix'
export default {
  name: `${prefixCls}ImgCrop`,
  data () {
    return {
      prefixCls: prefixCls,
      /* imgsrc: '', */
      axiosUpload: true, // 使用哪种方式上传
      fileName: '', // 上传的文件名
      imgRealWidth: '', // 上传图片实际宽
      drawImg: {
        img: null, // 规定要使用的图像、画布或视频
        x: 0, // 在画布上放置图像的 x 坐标位置
        y: 0, // 在画布上放置图像的 y 坐标位置
        width: 0, // 要使用的图像的宽度
        height: 0 // 要使用的图像的高度
      },
      controlBox: {
        // 裁切框
        width: this.imgWidth, // 这里初始设为裁切图片的最小宽
        height: this.imgHeight,
        left: this.boxWidth / 2 - this.imgWidth / 2, // 初始显示位置 这里应该设置为居中
        top: this.boxHeight / 2 - this.imgHeight / 2
      },
      controlBtnList: [
        'leftUp',
        'leftDown',
        'rightUp',
        'rightDown',
        'topCenter',
        'downCenter',
        'leftCenter',
        'rightCenter'
      ] // 显示改变大小的8个位置点名
    }
  },
  mixins: [comm],
  props: {
    boxWidth: {
      type: Number,
      default: 600
    }, // 显示的宽
    boxHeight: {
      type: Number,
      default: 400
    },
    imgWidth: {
      type: Number,
      default: 150
    }, // 裁切图片的最小宽
    imgHeight: {
      type: Number,
      default: 100
    }, // 最小高
    fixedScale: {
      // 约束比例
      type: Boolean,
      default: true
    },
    maxSize: {
      // 最大上传限制kb
      type: Number,
      default: 1024
    },
    value: [Array, String],
    name: {
      // input标签的 name 属性
      type: String,
      default: 'file'
    },
    data: Object, // 附加请求的参数
    headers: Object, // 上传请求 header 数据
    action: String,
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
    // 选择上传图片
    _selectImg () {
      this.$refs.inputFile.click()
    },
    // file改变时
    _fileChange (e) {
      const fileObj = e.target
      if (fileObj && fileObj.files && fileObj.files[0]) {
        this.axiosUpload = true
        this.fileName = fileObj.files[0].name
        const blob = this.getObjectURL(fileObj.files[0])
        this._imgToCanvas(blob, fileObj.files[0])
        /* const reader = new FileReader()
        reader.readAsDataURL(fileObj.files[0])
        reader.onload = e => {
          const newUrl = e.target.result
          this._imgToCanvas(newUrl, fileObj.files[0])
        } */
      } else if (fileObj) {
        // ie9低版本浏览器
        this.axiosUpload = false
        fileObj.select()
        fileObj.blur()
        const dataURL = document.selection.createRange().text
        const len = dataURL.lastIndexOf('/')
        this.fileName = dataURL.substr(len + 1) // 截取文件名
        this._imgToCanvas(dataURL)
      }
    },
    _imgToCanvas (src, file) {
      console.log(file)
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = e => {
        const imgHeight = img.height
        const imgWidth = img.width
        const boxHeight = this.boxHeight
        const boxWidth = this.boxWidth
        this.imgRealWidth = img.width
        let imgSize = e.target.fileSize
        if (file && file.size) {
          imgSize = file.size
        }
        console.log('imgSize')
        console.log(imgSize)
        if (imgSize && imgSize > this.maxSize * 1024) {
          this._emit(1)
          return
        }
        const rFilter = /^(image\/jpeg|image\/png|image\/jpg)$/i
        if (file && !rFilter.test(file.type)) {
          this._emit(3)
          return
        }
        let rate
        if (imgHeight < boxHeight && imgWidth < boxWidth) {
          rate = 1
        } else {
          if (imgWidth / imgHeight <= boxWidth / boxHeight) {
            // 计算宽高比
            rate = boxHeight / imgHeight
          } else {
            rate = boxWidth / imgWidth
          }
        }
        this.drawImg = {
          img: img, // 规定要使用的图像、画布或视频
          x: (boxWidth - imgWidth * rate) / 2, // 在画布上放置图像的 x 坐标位置
          y: (boxHeight - imgHeight * rate) / 2, // 在画布上放置图像的 y 坐标位置
          width: imgWidth * rate, // 要使用的图像的宽度
          height: imgHeight * rate // 要使用的图像的高度
        }
        this._drawImg()
      }
      img.src = src
      this._drawControlBox()
    },
    // 在canvas上画图
    _drawImg () {
      if (this.drawImg.img) {
        let c = this.$refs['canvas']
        let ctx = c.getContext('2d')
        ctx.clearRect(0, 0, c.width, c.height)
        ctx.drawImage(
          this.drawImg.img,
          this.drawImg.x,
          this.drawImg.y,
          this.drawImg.width,
          this.drawImg.height
        )
      }
    },
    // 裁切框
    _drawControlBox () {
      let {width, height, left, top} = this.controlBox
      // 限制框的位置
      if (left < 0) {
        left = 0
      }
      if (top < 0) {
        top = 0
      }
      if (left + width > this.boxWidth) {
        left = this.boxWidth - width
      }
      if (top + height > this.boxHeight) {
        top = this.boxHeight - height
      }
      // 设置位置
      this.controlBox.left = left
      this.controlBox.top = top
      // 同时在画布上画一个拖动层
      let c = this.$refs['canvasSelectBox']
      let ctx = c.getContext('2d')
      ctx.fillStyle = 'rgba(0,0,0,0.6)' // 遮罩层颜色
      ctx.clearRect(0, 0, c.width, c.height)
      ctx.fillRect(0, 0, c.width, c.height)
      ctx.clearRect(left, top, width, height)
    },
    // 裁切框鼠标事件
    _controlBoxMouseDown (e) {
      let flag = true
      if (flag) {
        const offSetX = this.controlBox.left
        const offSetY = this.controlBox.top
        const x = e.pageX - offSetX
        const y = e.pageY - offSetY
        document.onmousemove = ev => {
          console.log('_controlBoxonmousemove')
          const left = ev.pageX - x
          const top = ev.pageY - y
          // 修改值
          this.controlBox.left = left
          this.controlBox.top = top
          // 同步画布上的框位置
          this._drawControlBox()
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          flag = false
        }
      }
    },
    // 裁切框拖放改变大小
    _controlBtnMouseDown (e, direction) {
      let flag = true
      if (flag) {
        const x = e.pageX
        const y = e.pageY
        let {width, height, left, top} = this.controlBox
        document.onmousemove = ev => {
          const mx = ev.pageX - x // 移动的位置
          const my = ev.pageY - y
          let mWidth = width // 移动后的宽
          let mHeight = height
          let mLeft = left
          let mTop = top
          // 宽高比例
          const scaleHeight = this.imgWidth / this.imgHeight
          const scaleWidth = this.imgHeight / this.imgWidth
          switch (direction) {
            case 'leftUp':
              // 左上
              mWidth = width - mx
              if (this.fixedScale) {
                // 约束比例时
                mHeight = mWidth * scaleWidth
                mTop = top - (mHeight - height) // 原来的top+所增加的高（移动后的高－原来的高＝增加的高）
              } else {
                mHeight = height - my
                mTop = top + my
              }
              mLeft = left + mx
              break
            case 'leftCenter':
              // 向左
              mWidth = width - mx
              mLeft = left + mx
              if (this.fixedScale) {
                // 先简单往下增加高，应该是上下两边同时增加高才适合点的
                mHeight = mWidth * scaleWidth
              }
              break
            case 'leftDown':
              // 左下
              mWidth = width - mx
              mLeft = left + mx
              if (this.fixedScale) {
                mHeight = mWidth * scaleWidth
              } else {
                mHeight = height + my
              }
              break
            case 'topCenter':
              mHeight = height - my
              mTop = top + my
              if (this.fixedScale) {
                mWidth = mHeight * scaleHeight
              }
              break
            case 'downCenter':
              mHeight = height + my
              if (this.fixedScale) {
                mWidth = mHeight * scaleHeight
              }
              break
            case 'rightUp':
              mWidth = width + mx
              if (this.fixedScale) {
                mHeight = mWidth * scaleWidth
                mTop = top - (mHeight - height)
              } else {
                mHeight = height - my
                mTop = top + my
              }
              break
            case 'rightCenter':
              mWidth = width + mx
              if (this.fixedScale) {
                mHeight = mWidth * scaleWidth
              }
              break
            case 'rightDown':
              mWidth = width + mx
              if (this.fixedScale) {
                mHeight = mWidth * scaleWidth
              } else {
                mHeight = height + my
              }
              break
          }
          // 重新设置值
          // 限制最小选择范围
          if (mWidth < this.imgWidth || mHeight < this.imgHeight) {
            return
          }
          this.controlBox = {
            width: mWidth,
            height: mHeight,
            left: mLeft,
            top: mTop
          }
          // 同步画布
          this._drawControlBox()
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          flag = false
          console.log('onmouseup0000')
        }
      }
      e.stopPropagation()
    },
    // 控制底层canvas图片大小位置
    _controlCanvasMouseDown (e) {
      let flag = true
      if (flag) {
        const x = e.pageX - this.drawImg.x
        const y = e.pageY - this.drawImg.y
        document.onmousemove = ev => {
          this.drawImg.x = ev.pageX - x // 移动的位置
          this.drawImg.y = ev.pageY - y // 移动的位置
          this._drawImg() // 重绘
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          flag = false
        }
      }
    },
    // 鼠标滚轮事件
    _scaleImgWheel (e) {
      console.log('_scaleImgWheel')
      if (this.drawImg.img) {
        let scale
        // e是FF的事件。window.event是chrome/ie/opera的事件
        let ee = e || window.event
        if (ee.wheelDelta) {
          // IE/Opera/Chrome
          scale = -(ee.wheelDelta / 40)
        } else if (ee.detail) {
          // Firefox
          scale = ee.detail
        }
        let {x, y, height, width} = this.drawImg
        this.drawImg.x = x + scale * 3
        this.drawImg.y = y + scale * 3
        this.drawImg.width = width - scale * 9
        this.drawImg.height = (width - scale * 9) / (width / height)
        this._drawImg()
      }
      return false
    },
    // 导出图片
    _cropPicture () {
      // ie9上传时，因为使用的是硬盘映射绝对路径显示图片预览，不兼容导出。这里只能将图片传后台上裁切（）
      if (!this.axiosUpload) {
        this._emit(5)
        return
      }
      // 原理：先将底层canvas图片导出，再写到canvas里通过裁切，最后再导出
      if (!this.drawImg.img) {
        this._emit(2)
        return
      }
      const canvas = this.$refs['canvas']
      const tempImg = new Image()
      const {left, top} = this.controlBox // 裁切框的大小和位置
      const width = this.controlBox.width
      const height = this.controlBox.height
      const imgWidth = this.imgWidth
      const imgHeight = this.imgHeight
      tempImg.onload = () => {
        // 这里新创建一个canvas
        const newCanv = document.createElement('canvas')
        newCanv.width = imgWidth
        newCanv.height = imgHeight
        const ctx = newCanv.getContext('2d')
        ctx.clearRect(0, 0, imgWidth, imgHeight)
        ctx.drawImage(tempImg, left, top, width, height, 0, 0, imgWidth, imgHeight)
        const data = {
          fileName: this.fileName, // 上传文件名，如123.jpg
          name: this.name, // 文件域的name值
          action: this.action,
          headers: this.headers,
          data: this.data,
          timeout: this.timeout
        }
        // this.imgsrc = newCanv.toDataURL()
        const img1 = this._dataURLtoBlobToFile(newCanv.toDataURL('image/png', 1))
        this.getUpload(img1, data, this.axiosUpload, this._uploadStatus) // 将图片上传
      }
      tempImg.src = canvas.toDataURL()
    },
    // 上传回调事件
    _uploadStatus (res, type) {
      console.log('_uploadStatus')
      switch (type) {
        case 'loaded':
          this.$emit('input', res) // value只返回进度
          break
        case 'success':
          this.$emit('success', res)
          this.success && this.success(res)
          this.reset()
          break
        case 'catch':
          this._emit(4, res)
          this.reset()
          break
      }
    },
    _emit (type, res) {
      let error = {code: type}
      switch (type) {
        case 1:
          error.msg = '超出上传限制'
          break
        case 2:
          error.msg = '请选择上传图片'
          break
        case 3:
          error.msg = '请选择jpg、jpeg或png格式的图片'
          break
        case 4:
          error.msg = '请求异常'
          error.data = res
          break
        case 5:
          error.msg = '暂不支持ie10以下裁切上传'
          break
      }
      this.$emit('error', error)
      this.error && this.error(error)
    },
    // 将blob转换为file
    _dataURLtoBlobToFile (dataurl) {
      // const blob = this._dataURLtoBlob(dataurl)
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      /* return new Blob([u8arr], {type: mime}) */
      /* let blob = new Blob([u8arr], {type: mime})
      // 先转blob再转file
      blob.lastModifiedDate = new Date()
      // ie没有new File
      return new File([blob], this.fileName, {
        type: mime,
        lastModified: Date.now()
      }) */

      let blob = new Blob([u8arr], {type: mime})
      blob.lastModifiedDate = new Date()
      blob.name = this.fileName
      return blob
    },
    // 重置，上传成功或提供给外部调用
    reset () {
      this.drawImg = {
        img: null, // 规定要使用的图像、画布或视频
        x: 0, // 在画布上放置图像的 x 坐标位置
        y: 0, // 在画布上放置图像的 y 坐标位置
        width: 0, // 要使用的图像的宽度
        height: 0 // 要使用的图像的高度
      }
      this.$refs.formReset.reset()
    }
  },
  computed: {
    boxWidthPx () {
      return this.boxWidth + 'px'
    },
    boxHeightPx () {
      return this.boxHeight + 'px'
    },
    // 返回裁切控制框的大小和位置
    controlBoxStyle () {
      const {height, width, left, top} = this.controlBox
      return {
        height: height + 'px',
        width: width + 'px',
        left: left + 'px',
        top: top + 'px',
        position: 'absolute',
        cursor: 'move'
      }
    },
    scale () {
      // 使用显示的宽/图片实际宽
      return (this.drawImg.width / this.imgRealWidth).toFixed(2)
    }
  },
  mounted () {
    this.$nextTick(() => {
      let mousewheelevt = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel'
      if (mousewheelevt === 'mousewheel') {
        this.$refs['mainCrop'].onmousewheel = this._scaleImgWheel
      } else {
        this.$refs['mainCrop'].addEventListener('DOMMouseScroll', this._scaleImgWheel)
      }
    })
  },
  destroyed () {
    if (this.$refs['mainCrop']) {
      this.$refs['mainCrop'].removeEventListener('DOMMouseScroll', this._scaleImgWheel)
    }
  }
}
</script>
<style lang="scss">

</style>
