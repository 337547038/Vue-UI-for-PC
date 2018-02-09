<!--Created by 337547038 on 2018/2/9.-->
<template>
    <div class="upload">
        <a href="javascript:;" class="file">
            <span v-text="btnText"></span>
            <input type="file" @change="_onFileChange" :multiple="multiple">
        </a>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios';
    export default {
        name: 'upload',
        data () {
            return {
                images: []
            }
        },
        props: {
            action: String,//上传地址
            btnText: String,//上传按钮文本
            multiple: {//是否支持多选文件
                type: Boolean,
                default: true
            },
            data: Object,//上传时附带的额外参数
            name: String,//上传的文件字段名
            showList: {//是否显示已上传文件列表
                type: Boolean,
                default: false
            },
            type: {//上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）
                type: String,
                defalut: 'select'
            },
            accept: String,//接受上传的文件类型
            format: Array,//支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
            maxSize: Number,//文件大小限制，单位 kb
            exceededSize: Function,//文件超出指定大小限制时的钩子
            showProgress: Function,//上传进度
            success: Function,
            error: Function
        },
        components: {},
        methods: {
            _onFileChange(e){
                let file = e.target.files[0];
                let param = new FormData();
                param.append('file', file);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress: progressEvent => {
                        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
                        //this.progress = complete
                    }
                };
                axios.post('http://172.17.2.18/vue/upload.php', param, config)
                        .then(response => {
                            console.log('上传成功');
                            console.log(response.data)
                        }).catch(res=> {
                            console.log(res);
                })
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>