<!--Created by 337547038 on 2018/2/9.-->
<template>
    <div>
        <Upload btnText="选择文件"></Upload>
        <!--<input type="file" @change="onFileChange">
        <div v-if="images.length >0">
            <ul>
                <li v-for="(image,key) in images">

                    <img :src="image" @click='delImage(key)'/>
                    <a href="#" style="position: absolute;" @click='delImage(key)'>
                        删除
                    </a>
                </li>
            </ul>
            <button @click="removeImage">移除全部图片</button>
            <button @click='uploadImage'>上传</button>

        </div>
        <div>进度{{progress}}</div>
        https://lian-yue.github.io/vue-upload-component/#/en/examples/simple-->
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import Upload from '../components/upload/index'
    export default {
        name: 'upload',
        path: '/upload',
        data () {
            return {
                images: [],
                progress: ''
            }
        },
        props: {},
        components: {Upload},
        methods: {
            onFileChange: function (e) {
                //console.log(e.target.files)
                /*var files = e.target.files || e.dataTransfer.files;
                 if (!files.length)return;
                 this.createImage(files);*/
                let file = e.target.files[0];
                this._axios(file)

            },
            _axios(file){
                let param = new FormData();
                param.append('file', file);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
                        //this.progress = complete
                    }
                };
                axios.post('http://172.17.2.18/vue/upload.php', param, config)
                        .then(response => {
                            console.log('上传成功');
                            console.log(response.data)
                        })
            },
            createImage(file) {
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                let vm = this;
                let len = file.length;
                for (var i = 0; i < len; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function (e) {
                        vm.images.push(e.target.result);
                    };
                }
            },
            delImage: function (index) {
                this.images.shift(index);
            },
            removeImage: function (e) {
                this.images = [];
            },
            uploadImage: function () {
                console.log(this.images);
                return false;
                var obj = {};
                obj.images = this.images
                /*$.ajax({
                 type: 'post',
                 url: "upload.php",
                 data: obj,
                 dataType: "json",
                 success: function(data) {
                 if(data.status){
                 alert(data.msg);
                 return false;
                 }else{
                 alert(data.msg);
                 return false;
                 }
                 }
                 });*/
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
<style>
    li{ float: left; width: 120px; height: 90px; margin: 10px; overflow: hidden; }
    li img{ width: 100% }
</style>