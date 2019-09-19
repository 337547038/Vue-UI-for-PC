<template>
  <div>
    <div>
      <img :src="files.src" width="100" height="100" border="1">
      <ak-upload
        v-model="files"
        :action="url"
        @success="_success"
        :multiple="true"
        :maxSize="1024"
        @error="_error">自动上传
      </ak-upload>
    </div>
    <br>
    <div>
      {{files2}}
      <ak-upload
        v-model="files2"
        :action="url"
        @success="_success"
        :multiple="true"
        :maxSize="1024"
        @error="_error"
        :drag="true"
        ref="uploadFiles">选择文件
      </ak-upload>
      <ak-button @click="upload">上传</ak-button>
    </div>
    <!--<ak-table
      :data="tableData"
      style="width: 100%">
      <ak-column
        prop="date"
        label="日期"
        width="150">
        <ak-column
          prop="date"
          label="日期1"
          width="150">
        </ak-column>
        <ak-column
          prop="date"
          label="日期2"
          width="150">
        </ak-column>
      </ak-column>
      <ak-column label="配送信息">
        <ak-column
          prop="name"
          label="姓名"
          width="120">
        </ak-column>
        <ak-column label="地址">
          <ak-column
            prop="province"
            label="省份"
            width="120">
          </ak-column>
          <ak-column
            prop="city"
            label="市区"
            width="120">
          </ak-column>
          <ak-column
            prop="address"
            label="地址"
            width="300">
          </ak-column>
          <ak-column
            prop="zip"
            label="邮编"
            width="120">
          </ak-column>
        </ak-column>
      </ak-column>
      <ak-column label="操作"></ak-column>
    </ak-table>-->
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
      url: 'http://192.168.0.126:8099/vueTest/upload.php',
      files: {},
      files2: [],
      tableData: [
        {
          date: '2016-05-03',
          name: '1张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路8888号高大尚大厦',
          zip: 200330,
          trClass: 'trClass' // 特殊参数为当前tr添加指定样式
        },
        {
          date: '2016-05-02',
          name: '2张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路8888号高大尚大厦',
          zip: 200331
        }
        /* {
         date: '2016-05-04',
         name: '3张三',
         province: '广东',
         city: '天河区',
         address: '广东市天河区无名路8888号高大尚大厦',
         zip: 200332
       }
       {
         date: '2016-05-01',
         name: '4张三',
         province: '广东',
         city: '天河区',
         address: '广东市天河区无名路8888号高大尚大厦',
         zip: 200333
       },
       {
         date: '2016-05-03',
         name: '5张三',
         province: '广东',
         city: '天河区',
         address: '广东市天河区无名路8888号高大尚大厦',
         zip: 200334
       },
       {
         date: '2016-05-02',
         name: '6张三',
         province: '广东',
         city: '天河区',
         address: '广东市天河区无名路8888号高大尚大厦',
         zip: 200335
       },
       {
         date: '2016-05-04',
         name: '7张三',
         province: '广东',
         city: '天河区',
         address: '广东市天河区无名路8888号高大尚大厦',
         zip: 200336
       },
       {
         date: '2016-05-01',
         name: '8张三',
         province: '广东',
         city: '天河区',
         address: '广东市天河区无名路8888号高大尚大厦',
         zip: 200337
       } */
      ]
    }
  },
  components: {},
  methods: {
    upload () {
      this.$refs.uploadFiles.upload()
    },
    _success () {
      console.log('_success')
    },
    _error () {
      console.log('_error')
    }
  }
}
</script>
